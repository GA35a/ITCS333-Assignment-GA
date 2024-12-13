// Function to fetch and display the data
function fetchDataAndPopulateTable() {
    const apiUrl = 'https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100';

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response:", data);
            const sortedData = sortDataByYearAndSemester(data); // Sort the data by year and semester
            populateTable(sortedData); // Populate the table with the sorted data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to sort the data by year and semester
function sortDataByYearAndSemester(data) {
    const records = data.results || []; // Extract records from the data

    // Sort the records by year first, and then by semester
    return records.sort((a, b) => {
        // Compare by year (ascending order)
        if (a.year !== b.year) {
            return a.year.localeCompare(b.year);
        }

        // If years are the same, compare by semester (ascending order)
        return a.semester.localeCompare(b.semester);
    });
}

// Function to populate the table with sorted data
function populateTable(sortedData) {
    const tableBody = document.querySelector('#data-table tbody'); // Select the table body

    // Clear existing rows (if any)
    tableBody.innerHTML = '';

    // Loop through the sorted data and add rows to the table
    sortedData.forEach(record => {
        const row = document.createElement('tr');

        // Create table data cells
        const yearCell = document.createElement('td');
        yearCell.textContent = record.year || 'N/A';

        const semesterCell = document.createElement('td');
        semesterCell.textContent = record.semester || 'N/A';

        const programCell = document.createElement('td');
        programCell.textContent = record.the_programs || 'N/A';

        const collegeCell = document.createElement('td');
        collegeCell.textContent = record.colleges || 'N/A';

        const nationalityCell = document.createElement('td');
        nationalityCell.textContent = record.nationality || 'N/A';

        const numberOfStudentsCell = document.createElement('td');
        numberOfStudentsCell.textContent = record.number_of_students || 'N/A';

        // Append cells to the row
        row.appendChild(yearCell);
        row.appendChild(semesterCell);
        row.appendChild(programCell);
        row.appendChild(collegeCell);
        row.appendChild(nationalityCell);
        row.appendChild(numberOfStudentsCell);

        // Append row to the table body
        tableBody.appendChild(row);
    });
}

// Call the function to fetch data and populate the table
fetchDataAndPopulateTable();
