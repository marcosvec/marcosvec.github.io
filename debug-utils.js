// Console Obfuscation System
// This file contains obfuscated console messages and production mode controls

const CONSOLE_CONFIG = {
  // Set to true for production (disables all console logs)
  PRODUCTION_MODE: true,
  
  // Set to true to obfuscate console messages
  OBFUSCATE_MESSAGES: true,
  
  // Error codes only (no readable messages)
  MESSAGES: {
    'T001': 'T001',
    'T002': 'T002',
    'T003': 'T003',
    'T004': 'T004',
    'T005': 'T005',
    'T006': 'T006',
    'T007': 'T007',
    'T008': 'T008',
    'T009': 'T009',
    'T010': 'T010',
    'T011': 'T011',
    'T012': 'T012',
    'T013': 'T013',
    'T014': 'T014',
    'T015': 'T015',
    
    // Status codes
    'S001': 'S001',
    'S002': 'S002',
    'S003': 'S003',
    'S004': 'S004',
    'S005': 'S005',
    'S006': 'S006'
  }
};

// Console wrapper that handles obfuscation and production mode
const ConsoleWrapper = {
  log: function(...args) {
    if (CONSOLE_CONFIG.PRODUCTION_MODE) return;
    
    if (CONSOLE_CONFIG.OBFUSCATE_MESSAGES) {
      const obfuscatedArgs = args.map(arg => {
        if (typeof arg === 'string' && arg.includes('Error Code: ')) {
          const codeMatch = arg.match(/Error Code: ([A-Z]\d+)/);
          if (codeMatch) {
            const code = codeMatch[1];
            const obfuscatedMessage = CONSOLE_CONFIG.MESSAGES[code];
            if (obfuscatedMessage) {
              return arg.replace(/Error Code: [A-Z]\d+.*/, `Error Code: ${code} - ${obfuscatedMessage}`);
            }
          }
        }
        return arg;
      });
      console.log(...obfuscatedArgs);
    } else {
      console.log(...args);
    }
  },
  
  warn: function(...args) {
    if (CONSOLE_CONFIG.PRODUCTION_MODE) return;
    console.warn(...args);
  },
  
  error: function(...args) {
    if (CONSOLE_CONFIG.PRODUCTION_MODE) return;
    console.error(...args);
  }
};

// Override console methods globally
if (typeof window !== 'undefined') {
  window.CONSOLE_CONFIG = CONSOLE_CONFIG;
  window.ConsoleWrapper = ConsoleWrapper;
  
  // Override global console for production mode
  if (CONSOLE_CONFIG.PRODUCTION_MODE) {
    console.log = function() {};
    console.warn = function() {};
    console.error = function() {};
  }
}
