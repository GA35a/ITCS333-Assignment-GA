// Function to fetch data from the API and populate the HTML table
function fetchDataAndPopulateTable() {
    // API URL to fetch data
    const apiUrl = 'https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100';

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => {
            // Check if the response is successful (status 200-299)
            if (!response.ok) {
                // If not successful, throw an error
                throw new Error('Network response was not ok');
            }
            // Convert the response body to JSON format
            return response.json();
        })
        .then(data => {
            // Log the full API response to the console to check its structure
            console.log("API Response:", data);

            // Call the populateTable function and pass the data to display it in the table
            populateTable(data);
        })
        .catch(error => {
            // If there's any error in the fetch process, log it to the console
            console.error('Error fetching data:', error);
        });
}

// Function to populate the table with the retrieved data
function populateTable(data) {
    // Select the table body where the data rows will be inserted
    const tableBody = document.querySelector('#data-table tbody');

    // Clear any existing rows in the table body to avoid duplicate entries
    tableBody.innerHTML = '';
    const records = data.results || []; // If data.results is not available, use an empty array

    // Loop through each record in the fetched data
    records.forEach(record => {
        // Create a new table row for each record
        const row = document.createElement('tr');

        // Create a cell for the year and set its text content
        const yearCell = document.createElement('td');
        yearCell.textContent = record.year || 'N/A'; // Display 'N/A' if no year is available

        // Create a cell for the semester and set its text content
        const semesterCell = document.createElement('td');
        semesterCell.textContent = record.semester || 'N/A';

        // Create a cell for the program and set its text content
        const programCell = document.createElement('td');
        programCell.textContent = record.the_programs || 'N/A';

        // Create a cell for the college name and set its text content
        const collegeCell = document.createElement('td');
        collegeCell.textContent = record.colleges || 'N/A';

        // Create a cell for the nationality and set its text content
        const nationalityCell = document.createElement('td');
        nationalityCell.textContent = record.nationality || 'N/A';

        // Create a cell for the number of students and set its text content
        const numberOfStudentsCell = document.createElement('td');
        numberOfStudentsCell.textContent = record.number_of_students || 'N/A';

        // Append each cell to the table row
        row.appendChild(yearCell);
        row.appendChild(semesterCell);
        row.appendChild(programCell);
        row.appendChild(collegeCell);
        row.appendChild(nationalityCell);
        row.appendChild(numberOfStudentsCell);

        // Append the newly created row to the table body
        tableBody.appendChild(row);
    });
}

// Call the fetchDataAndPopulateTable function to start the data fetching and table population process
fetchDataAndPopulateTable();
