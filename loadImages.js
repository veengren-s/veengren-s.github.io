// app.js
async function loadLinks() {
  try {
    // This gets the <script> tag that loaded this JS file
    const currentScript = document.currentScript;

    // Read the data attribute
    const section = currentScript.dataset.source;

    // Fetch the YAML file
    const response = await fetch('./links.yaml');
    const yamlText = await response.text();

    // Parse YAML into JS object
    const data = jsyaml.load(yamlText);

    sectionData = data[section]

    // Get container div
    const images = document.getElementById("images-wrapper");

    // Build page dynamically
    sectionData.forEach(link => {
        const image = document.createElement("img")
        image.src = link
        image.class = 'thumb'
        images.appendChild(image)
    });

  } catch (err) {
    console.error("Failed to load YAML:", err);
  }
}

loadLinks()