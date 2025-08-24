// Utility functions for slideshow import/export

export const exportSlideData = (state) => {
  try {
    // Create the data structure for export
    const exportData = {
      version: "1.0",
      exportDate: new Date().toISOString(),
      slideData: {
        currentPhotoindex: state.currentPhotoindex,
        currentMode: state.currentMode,
        currentTheme: state.currentTheme,
        photos: state.photos,
        displayTime: state.displayTime,
      }
    };

    // Convert to JSON string
    const jsonString = JSON.stringify(exportData, null, 2);
    
    // Create blob and download
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Generate filename with current date and time
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `slideshow-export-${dateStr}.json`;
    
    // Create download link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return { success: true, filename };
  } catch (error) {
    console.error('Export failed:', error);
    return { success: false, error: error.message };
  }
};

export const importSlideData = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      reject(new Error('Please select a valid JSON file'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const jsonContent = event.target.result;
        const importData = JSON.parse(jsonContent);
        
        // Validate the imported data structure
        if (!importData.slideData) {
          reject(new Error('Invalid file format: missing slideData'));
          return;
        }
        
        const { slideData } = importData;
        
        // Validate required fields
        if (!Array.isArray(slideData.photos)) {
          reject(new Error('Invalid file format: photos must be an array'));
          return;
        }
        
        // Set defaults for missing fields
        const validatedData = {
          currentPhotoindex: slideData.currentPhotoindex || 0,
          currentMode: slideData.currentMode || "manual",
          currentTheme: slideData.currentTheme || "a",
          photos: slideData.photos,
          displayTime: slideData.displayTime || 2000,
        };
        
        resolve(validatedData);
      } catch (error) {
        reject(new Error(`Failed to parse JSON file: ${error.message}`));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};
