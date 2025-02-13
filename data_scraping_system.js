async function collectUserData() {
    const userData = {
        personal_identity: {
            name: prompt("তোমার নাম লিখো:"),
            birth_date: prompt("জন্ম তারিখ (YYYY-MM-DD):")
        },
        knowledge: {
            education: prompt("শিক্ষাগত যোগ্যতা:"),
            skills: prompt("দক্ষতা (কমা দিয়ে আলাদা করো):").split(", ")
        },
        philosophy: {
            life_purpose: prompt("জীবনের লক্ষ্য:")
        }
    };

    const jsonData = JSON.stringify(userData, null, 4);

    // JSON File Browser Download
    const blob = new Blob([jsonData], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "life_data.json";
    a.click();
}

// Function Calling System
collectUserData();