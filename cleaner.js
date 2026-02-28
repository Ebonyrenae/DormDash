import fs from 'fs';

try {
    // 1. Read the file
    const rawData = JSON.parse(fs.readFileSync('./schools.json', 'utf8'));

    // 2. Loop and filter (Adding a check for name existence)
    const cleanData = rawData
        .filter(school => school && school.name) // 👈 This skips any empty/broken entries
        .map(school => ({
            name: school.name,
            state: (school["state-province"] && school["state-province"].length > 0) 
                   ? school["state-province"][0] // Some API entries return an array for state
                   : "USA"
        }));

    // 3. Sort A-Z (Safely)
    cleanData.sort((a, b) => a.name.localeCompare(b.name));

    // 4. Save it
    fs.writeFileSync('./schools.json', JSON.stringify(cleanData, null, 2));

    console.log(`Success! Cleaned ${cleanData.length} universities.`);
} catch (error) {
    console.error("Error processing data:", error.message);
}