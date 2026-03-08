// app.js
document.addEventListener('DOMContentLoaded', () => {
    const addInput = document.getElementById('add-input');
    const addBtn = document.getElementById('add-btn');
    const queryInput = document.getElementById('query-input');
    const recordsList = document.getElementById('records-list');
    const exportBtn = document.getElementById('export-btn');
    const importBtn = document.getElementById('import-btn');
    const importInput = document.getElementById('import-input');
    const recordCount = document.getElementById('record-count');

    let dataRecords = [];

    // Load records from local storage
    function loadRecords() {
        const stored = localStorage.getItem('dataRecords');
        if (stored) {
            dataRecords = JSON.parse(stored);
        }
    }

    // Save records to local storage
    function saveRecords() {
        localStorage.setItem('dataRecords', JSON.stringify(dataRecords));
    }

    // Parse string to sorted array of unique numbers
    function parseNumbers(str) {
        const nums = str.trim().split(/\s+/).map(Number).filter(n => !isNaN(n) && n > 0);
        return Array.from(new Set(nums)).sort((a, b) => a - b);
    }

    // Check if subArr is a subset of superArr
    function isSubset(subArr, superArr) {
        return subArr.every(val => superArr.includes(val));
    }

    // Render records to DOM
    function renderRecords(recordsToRender) {
        recordsList.innerHTML = '';
        
        // Sorting records lexicographically (by length, then elements) for consistency in ascending order
        const sortedRecords = [...recordsToRender].sort((a, b) => {
            if (a.length !== b.length) return a.length - b.length;
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) return a[i] - b[i];
            }
            return 0;
        });

        sortedRecords.forEach((record, index) => {
            const card = document.createElement('div');
            card.className = 'record-card';
            card.style.animationDelay = `${index * 0.05}s`;
            
            record.forEach(num => {
                const pill = document.createElement('div');
                pill.className = 'number-pill';
                pill.textContent = num;
                card.appendChild(pill);
            });
            
            recordsList.appendChild(card);
        });

        recordCount.textContent = `${sortedRecords.length} record${sortedRecords.length !== 1 ? 's' : ''}`;
    }

    // Add new numbers
    function handleAdd() {
        const inputStr = addInput.value;
        const newRecord = parseNumbers(inputStr);
        
        if (newRecord.length === 0) {
            alert('Please enter valid positive numbers separated by spaces.');
            return;
        }

        // Remove all existing records that are subsets of the new record (Expand functionality)
        dataRecords = dataRecords.filter(record => !isSubset(record, newRecord));
        
        // Add the new record
        dataRecords.push(newRecord);
        
        saveRecords();
        
        // Clear input and query to show all
        addInput.value = '';
        queryInput.value = '';
        renderRecords(dataRecords);
    }

    // Query numbers
    function handleQuery() {
        const inputStr = queryInput.value;
        const queryRecord = parseNumbers(inputStr);
        
        if (queryRecord.length === 0 && inputStr.trim() !== "") {
            renderRecords([]);
            return;
        }
        
        if (queryRecord.length === 0) {
            renderRecords(dataRecords);
            return;
        }

        // Return all records that contain the query numbers (query is subset of record)
        const results = dataRecords.filter(record => isSubset(queryRecord, record));
        renderRecords(results);
    }

    // Export Data 
    function handleExport() {
        if (dataRecords.length === 0) {
            alert("No data to export!");
            return;
        }
        const dataStr = JSON.stringify(dataRecords, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "number-vault-export.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Import Data Trigger
    function handleImportClick() {
        importInput.click();
    }

    // Handle File Selection
    function handleFileImport(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedData = JSON.parse(event.target.result);
                
                // Validate Data format: Should be an array of number arrays
                if (!Array.isArray(importedData)) {
                    throw new Error("Invalid format: Must be a JSON array.");
                }

                let importedCount = 0;
                
                importedData.forEach(importedRecord => {
                    if (Array.isArray(importedRecord) && importedRecord.every(num => typeof num === 'number' && num > 0)) {
                        // Ensure it's sorted and unique
                        const cleanNewRecord = Array.from(new Set(importedRecord)).sort((a,b) => a-b);
                        
                        // Check if it's already a subset of an existing record (no need to add)
                        const isAlreadySubset = dataRecords.some(existing => isSubset(cleanNewRecord, existing));
                        
                        if (!isAlreadySubset) {
                            // Expand/Merge logic: Remove existing subsets of the incoming record
                            dataRecords = dataRecords.filter(existing => !isSubset(existing, cleanNewRecord));
                            dataRecords.push(cleanNewRecord);
                            importedCount++;
                        }
                    }
                });

                if (importedCount > 0) {
                    saveRecords();
                    renderRecords(dataRecords);
                    alert(`Successfully imported and merged ${importedCount} new record(s).`);
                } else {
                    alert("File processed, but no new/larger records were found to add.");
                }

            } catch (error) {
                alert(`Error parsing file: ${error.message}`);
            }
            // Reset input so the exact same file can be selected again if needed
            importInput.value = ""; 
        };
        reader.readAsText(file);
    }

    // Event Listeners
    addBtn.addEventListener('click', handleAdd);
    
    addInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAdd();
    });

    queryInput.addEventListener('input', handleQuery);
    
    exportBtn.addEventListener('click', handleExport);
    importBtn.addEventListener('click', handleImportClick);
    importInput.addEventListener('change', handleFileImport);

    // Initial load
    loadRecords();
    renderRecords(dataRecords);
});
