// Debug utility for the birthday website
const DEBUG = {
    enabled: true,
    logFile: 'debug.log',
    errors: [],
    logEntries: [],

    init: function() {
        try {
            console.log('Initializing debug utility...');
            const downloadBtn = document.getElementById('download-log-btn');
            
            if (downloadBtn) {
                downloadBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.dumpErrors();
                });
                console.log('Debug utility initialized successfully');
            } else {
                console.error('Download button not found!');
            }
        } catch (error) {
            console.error('Failed to initialize debug utility:', error);
        }
    },

    log: function(message, data = null) {
        if (!this.enabled) return;
        
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}`;
        
        // Log to console
        console.log(logMessage);
        if (data) console.log(data);

        // Add to log entries
        this.logEntries.push(logMessage);
        if (data) {
            this.logEntries.push(JSON.stringify(data, null, 2));
        }
    },

    error: function(message, error = null) {
        if (!this.enabled) return;
        
        const timestamp = new Date().toISOString();
        const errorMessage = `[${timestamp}] ERROR: ${message}`;
        
        // Log to console
        console.error(errorMessage);
        if (error) console.error(error);

        // Add to errors array
        this.errors.push({
            timestamp,
            message,
            error: error ? error.toString() : null,
            stack: error ? error.stack : null
        });

        // Add to log entries
        this.logEntries.push(errorMessage);
        if (error) {
            this.logEntries.push(error.stack);
        }
    },

    createLogFile: function() {
        try {
            // Combine all log entries into a single string
            let combinedLog = '=== DEBUG LOG ===\n\n';
            combinedLog += this.logEntries.join('\n') + '\n';
            
            // Add error dump if there are errors
            if (this.errors.length > 0) {
                combinedLog += '\n=== ERROR DUMP ===\n';
                combinedLog += JSON.stringify({
                    timestamp: new Date().toISOString(),
                    totalErrors: this.errors.length,
                    errors: this.errors
                }, null, 2);
            }
            
            return new Blob([combinedLog], { type: 'text/plain' });
        } catch (e) {
            console.error('Failed to create log file:', e);
            return null;
        }
    },

    dumpErrors: function() {
        try {
            const blob = this.createLogFile();
            if (!blob) {
                console.error('Failed to create log file');
                return;
            }

            // Create a download link
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = this.logFile;
            
            // Append to body, click, and remove
            document.body.appendChild(link);
            link.click();
            
            // Cleanup
            setTimeout(() => {
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }, 100);
            
            console.log('Error log downloaded successfully');
        } catch (e) {
            console.error('Failed to download log file:', e);
        }
    }
};

// Initialize the debug utility when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    DEBUG.init();
}); 