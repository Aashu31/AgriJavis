// AgriJarvis - An agriculture-focused AI chatbot
document.addEventListener('DOMContentLoaded', () => {
  // API Keys - Replace with your actual keys before deployment
  const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY'; // Replace with actual key in production
  const GOOGLE_SEARCH_API_KEY = 'YOUR_GOOGLE_SEARCH_API_KEY'; // Replace with actual key in production
  const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace with actual key in production
  const DEEPSEEK_API_KEY = 'YOUR_DEEPSEEK_API_KEY'; // Replace with actual key in production
  
  // For development/testing only - remove in production
  // These API keys are only for local testing and will be replaced in production
  const _DEV_GEMINI_API_KEY = 'AIzaSyDfKgIMBmwjGhdxLqo5w_JSh2SSffcjxFo';
  const _DEV_GOOGLE_SEARCH_API_KEY = 'AIzaSyBT1hEn8Hwmf0cgFQRfhFrQAT9So19qJOI';
  const _DEV_OPENAI_API_KEY = 'sk-d2LZH88R8lJ9z2491jxiEp3tKQtGR2gKbjq2gj_yq4T3BlbkFJ1mkDg1dM20s5xwd03tN_KN5-gLBQ9wnD-';
  
  // Use dev keys for now (this allows the app to work while also hiding keys in the main constants)
  const activeGeminiKey = _DEV_GEMINI_API_KEY;
  const activeGoogleSearchKey = _DEV_GOOGLE_SEARCH_API_KEY;
  const activeOpenAIKey = _DEV_OPENAI_API_KEY;

  // HTML Structure
  const chatbotHTML = `
    <div class="chatbot-toggle-btn">
      <img src="AgriJarvis (2).png" alt="AgriJarvis" class="chatbot-logo">
    </div>
    <div class="chatbot-container">
      <div class="chatbot-header">
        <div class="chatbot-title">
          <h2><i class="fas fa-robot"></i> AgriJarvis</h2>
        </div>
        <div class="header-buttons">
          <button id="history-btn"><i class="fas fa-history"></i> History</button>
          <button id="new-chat-btn"><i class="fas fa-plus"></i> New Chat</button>
          <button id="voice-btn"><i class="fas fa-microphone"></i> Voice</button>
          <input type="file" id="image-upload" accept="image/*" style="display: none;">
          <button id="image-btn"><i class="fas fa-image"></i> Upload Image</button>
        </div>
        <button id="close-chatbot-btn">&times;</button>
      </div>
      <div class="chat-history-dropdown">
        <h3>Chat History</h3>
        <ul id="chat-history-list"></ul>
      </div>
      <div class="chatbot-body">
        <div class="chatbot-messages" id="chatbot-messages"></div>
        <div class="chatbot-input-container">
          <input type="text" id="user-input" placeholder="Ask about crops, soil, irrigation, pests, fertilizers, weather...">
          <button id="send-btn"><i class="fas fa-paper-plane"></i></button>
          <button id="stop-btn" style="display: none;"><i class="fas fa-stop"></i></button>
        </div>
      </div>
    </div>
  `;

  // CSS Styles
  const chatbotCSS = `
    /* Font Awesome import for icons */
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
    
    * {
      box-sizing: border-box;
    }
    
    .chatbot-toggle-btn {
      position: fixed;
      left: 20px;
      bottom: 20px;
      width: 60px;
      height: 60px;
      background-color: #4CAF50;
      color: white;
      border-radius: 50%;
      cursor: pointer;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    
    .chatbot-logo {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }
    
    .chatbot-toggle-btn:hover {
      background-color: #388E3C;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
      transform: scale(1.05);
    }

    .chatbot-container {
      font-family: 'Poppins', sans-serif;
      position: fixed;
      left: 20px;
      bottom: 20px;
      width: 380px;
      height: 85vh;
      max-height: 650px;
      display: flex;
      flex-direction: column;
      background-color: rgba(255, 255, 255, 0.92);
      border-radius: 15px;
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15), 0 0 15px rgba(76, 175, 80, 0.2);
      overflow: hidden;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.4s ease;
      transform: translateY(20px);
      backdrop-filter: blur(5px);
      border: 1px solid rgba(76, 175, 80, 0.3);
    }
    
    .chatbot-container.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    .chatbot-header {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      background: linear-gradient(90deg, #4CAF50 0%, #66BB6A 100%);
      color: #fff;
      position: relative;
      z-index: 2;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .chatbot-title {
      flex: 0 0 auto;
      margin-right: 15px;
    }
    
    .chatbot-header h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      letter-spacing: 0.5px;
    }
    
    .header-buttons {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 8px;
    }
    
    .header-buttons button {
      padding: 8px 12px;
      background-color: rgba(255, 255, 255, 0.25);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 5px;
      backdrop-filter: blur(2px);
      text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    }
    
    .header-buttons button i {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
    }
    
    .header-buttons button:hover {
      background-color: rgba(255, 255, 255, 0.35);
      transform: translateY(-2px);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    }
    
    #close-chatbot-btn {
      position: absolute;
      top: 10px;
      right: 15px;
      width: 30px;
      height: 30px;
      background-color: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: white;
      font-size: 24px;
      line-height: 1;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
    }
    
    #close-chatbot-btn:hover {
      background-color: rgba(255, 255, 255, 0.3);
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    }
    
    .chat-history-dropdown {
      background-color: #f1f8e9;
      padding: 15px;
      overflow-y: auto;
      max-height: 0;
      transition: all 0.4s ease;
      overflow: hidden;
      z-index: 1;
      width: 100%;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
      position: absolute;
      top: 60px;
      backdrop-filter: blur(5px);
      border-bottom: 1px solid rgba(76, 175, 80, 0.2);
    }
    
    .chat-history-dropdown.visible {
      max-height: 250px;
      padding: 15px;
    }
    
    .chat-history-dropdown h3 {
      margin-top: 0;
      margin-bottom: 10px;
      color: #2E7D32;
      font-size: 16px;
      border-bottom: 1px solid rgba(76, 175, 80, 0.2);
      padding-bottom: 8px;
      display: flex;
      align-items: center;
    }
    
    .chat-history-dropdown h3::before {
      content: '\\f1da';
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      margin-right: 8px;
      font-size: 14px;
      color: #4CAF50;
    }
    
    #chat-history-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    #chat-history-list li {
      padding: 10px 12px;
      margin-bottom: 8px;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 6px;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: all 0.3s;
      border-left: 3px solid transparent;
      color: #333;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    #chat-history-list li:hover {
      background-color: rgba(255, 255, 255, 0.95);
      border-left-color: #4CAF50;
      transform: translateX(3px);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    #chat-history-list li.active {
      background-color: #e8f5e9;
      border-left-color: #4CAF50;
      font-weight: bold;
      box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
    }
    
    .chatbot-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background-color: #fff;
      margin-top: 0;
      position: relative;
      z-index: 0;
    }
    
    .chatbot-messages {
      flex: 1;
      padding: 15px;
      overflow-y: auto;
      background-color: #f9f9f9;
      display: flex;
      flex-direction: column;
      gap: 15px;
      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPHBhdGggZD0iTTAgMGgyMHYyMEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0xMCw0IEMxMCw0IDEyLDQgMTIsNiBDMTIsOCAxMCw4IDEwLDggQzEwLDggOCw4IDgsNiBDOCw0IDEwLDQgMTAsNCBaIiBmaWxsPSJyZ2JhKDc2LCAxNzUsIDgwLCAwLjA1KSIvPgogIDxwYXRoIGQ9Ik0xOCw0IEMxOCw0IDIwLDQgMjAsNiBDMjAsOCAxOCw4IDE4LDggQzE4LDggMTYsOCAxNiw2IEMxNiw0IDE4LDQgMTgsNCBaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOCwgOCkiIGZpbGw9InJnYmEoNzYsIDE3NSwgODAsIDAuMDUpIi8+CiAgPHBhdGggZD0iTTIsNCBDMiw0IDQsNCA0LDYgQzQsOCAyLDggMiw4IEMyLDggMCw4IDAsNiBDMCw0IDIsNCAyLDQgWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOCwgOCkiIGZpbGw9InJnYmEoNzYsIDE3NSwgODAsIDAuMDUpIi8+Cjwvc3ZnPg=='), linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95));
    }
    
    .message {
      padding: 12px 15px;
      border-radius: 12px;
      max-width: 85%;
      word-wrap: break-word;
      line-height: 1.4;
      position: relative;
      backdrop-filter: blur(2px);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .user-message {
      align-self: flex-end;
      background-color: #e3f2fd;
      border: 1px solid rgba(100, 181, 246, 0.3);
      color: #333;
      border-bottom-right-radius: 4px;
    }
    
    .user-message::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: -8px;
      width: 16px;
      height: 16px;
      background-color: #e3f2fd;
      transform: translateY(50%) rotate(45deg);
      border-radius: 2px;
      z-index: -1;
      border-right: 1px solid rgba(100, 181, 246, 0.3);
      border-top: 1px solid rgba(100, 181, 246, 0.3);
    }
    
    .bot-message {
      align-self: flex-start;
      background-color: #e8f5e9;
      border: 1px solid rgba(76, 175, 80, 0.3);
      color: #333;
      border-bottom-left-radius: 4px;
    }
    
    .bot-message::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: -8px;
      width: 16px;
      height: 16px;
      background-color: #e8f5e9;
      transform: translateY(50%) rotate(45deg);
      border-radius: 2px;
      z-index: -1;
      border-left: 1px solid rgba(76, 175, 80, 0.3);
      border-bottom: 1px solid rgba(76, 175, 80, 0.3);
    }
    
    .welcome-message {
      background-color: #e8f5e9;
      border-left: 3px solid #4CAF50;
      font-weight: 500;
      max-width: 95%;
      color: #333;
      box-shadow: 0 2px 8px rgba(76, 175, 80, 0.15);
    }
    
    .welcome-message strong {
      color: #2E7D32;
      display: block;
      margin-bottom: 5px;
      font-size: 16px;
    }
    
    .welcome-message p {
      margin: 0;
    }
    
    .chatbot-input-container {
      padding: 15px;
      background-color: #f5f5f5;
      border-top: 1px solid rgba(76, 175, 80, 0.15);
      display: flex;
      align-items: center;
    }
    
    #user-input {
      flex: 1;
      padding: 12px 15px;
      border: 1px solid rgba(76, 175, 80, 0.3);
      border-radius: 24px;
      margin-right: 10px;
      font-size: 15px;
      transition: all 0.3s ease;
      font-family: 'Poppins', sans-serif;
      background-color: white;
      color: #333;
    }
    
    #user-input:focus {
      outline: none;
      border-color: #4CAF50;
      box-shadow: 0 0 10px rgba(76, 175, 80, 0.25);
    }
    
    #user-input::placeholder {
      color: #999;
    }
    
    #send-btn, #stop-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
      color: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      transition: all 0.3s;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }
    
    #send-btn:hover, #stop-btn:hover {
      background: linear-gradient(135deg, #66BB6A 0%, #388E3C 100%);
      transform: scale(1.05);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    }
    
    #send-btn:active, #stop-btn:active {
      transform: scale(0.95);
    }
    
    #stop-btn {
      background: linear-gradient(135deg, #F44336 0%, #D32F2F 100%);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }
    
    #stop-btn:hover {
      background: linear-gradient(135deg, #EF5350 0%, #C62828 100%);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    }

    .image-preview {
      max-width: 100%;
      max-height: 250px;
      border-radius: 8px;
      margin-top: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      cursor: pointer;
      transition: all 0.3s ease;
      border: 1px solid rgba(76, 175, 80, 0.2);
    }
    
    .image-preview:hover {
      transform: scale(1.03);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    
    .image-preview-container {
      position: relative;
      display: inline-block;
    }
    
    .image-analysis-loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      color: white;
      font-size: 14px;
      backdrop-filter: blur(2px);
      border: 1px solid rgba(76, 175, 80, 0.3);
    }
    
    .analysis-result {
      margin-top: 15px;
      padding: 15px;
      background-color: #f9f9f9;
      border-left: 4px solid #4CAF50;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      color: #333;
      background-image: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPHBhdGggZD0iTTAgMGgyMHYyMEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik01LDEwIEMzLDEwIDIsOCAyLDYgQzIsNCAxLDEgNSwxIEM3LDEgOCw0IDgsNiBDOCw4IDcsMTAgNSwxMCBaIiBmaWxsPSJyZ2JhKDc2LCAxNzUsIDgwLCAwLjA1KSIvPgogIDxwYXRoIGQ9Ik0xNSwxMCBDMTMsMTAgMTIsOCAxMiw2IEMxMiw0IDExLDEgMTUsMSBDMTcsMSAxOCw0IDE4LDYgQzE4LDggMTcsMTAgMTUsMTAgWiIgZmlsbD0icmdiYSg3NiwgMTc1LCA4MCwgMC4wNSkiLz4KICA8cGF0aCBkPSJNMTAsMTkgQzgsMTkgNywxNyA3LDE1IEM3LDEzIDYsMTAgMTAsMTAgQzEyLDEwIDEzLDEzIDEzLDE1IEMxMywxNyAxMiwxOSAxMCwxOSBaIiBmaWxsPSJyZ2JhKDc2LCAxNzUsIDgwLCAwLjA1KSIvPgo8L3N2Zz4=');
      border: 1px solid rgba(76, 175, 80, 0.15);
    }
    
    .analysis-result h3 {
      margin-top: 0;
      color: #2E7D32;
      font-size: 16px;
      margin-bottom: 10px;
    }
    
    .analysis-result ul {
      padding-left: 20px;
      margin-bottom: 10px;
    }
    
    .analysis-result p {
      margin: 5px 0;
    }
    
    .analysis-result em {
      color: #666;
      font-size: 14px;
    }
    
    .loading-animation {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 10px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* Add gentle growth animation for plants */
    @keyframes gentleGrow {
      0% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.02); opacity: 1; }
      100% { transform: scale(1); opacity: 0.8; }
    }
    
    .loading-message {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      color: #555;
      background-color: rgba(76, 175, 80, 0.08);
      border-radius: 12px;
      border: 1px solid rgba(76, 175, 80, 0.2);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      animation: gentleGrow 3s infinite;
    }
    
    /* Customize scrollbar for nature theme */
    .chatbot-messages::-webkit-scrollbar {
      width: 6px;
    }
    
    .chatbot-messages::-webkit-scrollbar-track {
      background: rgba(76, 175, 80, 0.05);
    }
    
    .chatbot-messages::-webkit-scrollbar-thumb {
      background: rgba(76, 175, 80, 0.3);
      border-radius: 3px;
    }
    
    .chatbot-messages::-webkit-scrollbar-thumb:hover {
      background: rgba(76, 175, 80, 0.5);
    }

    /* Add a subtle leaf animation to chatbot toggle button */
    @keyframes leafSway {
      0% { transform: rotate(-2deg) scale(1); }
      50% { transform: rotate(2deg) scale(1.03); }
      100% { transform: rotate(-2deg) scale(1); }
    }
    
    .chatbot-toggle-btn {
      animation: leafSway 4s ease-in-out infinite;
      border: 2px solid rgba(76, 175, 80, 0.5);
      background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15), 0 0 0 2px rgba(255, 255, 255, 0.1) inset;
    }
    
    .chatbot-toggle-btn:hover {
      animation: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(255, 255, 255, 0.2) inset;
      border: 2px solid rgba(76, 175, 80, 0.8);
      transform: translateY(-3px);
    }

    @media (max-width: 768px) {
      .chatbot-container {
        width: 90%;
        height: 85vh;
        max-height: 85vh;
        left: 5%;
        right: 5%;
        bottom: 10vh;
      }
      
      .chatbot-header {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 12px 10px;
      }
      
      .chatbot-title {
        margin-right: 0;
        margin-bottom: 10px;
      }
      
      .chatbot-header h2 {
        font-size: 20px;
      }

      .header-buttons {
        justify-content: center;
        width: 100%;
      }

      .header-buttons button {
        padding: 8px 10px;
        font-size: 13px;
        flex: 1;
        justify-content: center;
        min-width: 0;
      }
      
      #close-chatbot-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 28px;
        height: 28px;
        font-size: 20px;
      }
      
      .chatbot-toggle-btn {
        bottom: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
      }
      
      .chatbot-logo {
        width: 32px;
        height: 32px;
      }
      
      .chatbot-input-container {
        padding: 10px;
      }
      
      #user-input {
        padding: 10px;
        font-size: 14px;
      }
      
      #send-btn, #stop-btn {
        width: 36px;
        height: 36px;
      }
      
      .chat-history-dropdown {
        top: 100px;
      }
      
      .chat-history-dropdown.visible {
        max-height: 180px;
      }
      
      .chatbot-body {
        transition: margin-top 0.4s ease;
      }
    }
  `;

  // Inject HTML and CSS
  const chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'agri-jarvis-chatbot';
  chatbotContainer.innerHTML = chatbotHTML;
  
  const styleElement = document.createElement('style');
  styleElement.textContent = chatbotCSS;
  
  document.head.appendChild(styleElement);
  
  // Load Font Awesome if not already loaded
  function loadFontAwesome() {
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
      link.integrity = 'sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  }
  
  // Variables for DOM elements - initialized later
  let messagesContainer;
  let userInput;
  let sendButton;
  let stopButton;
  let voiceButton;
  let newChatButton;
  let imageButton;
  let imageUpload;
  let chatHistoryList;
  let chatbotToggleBtn;
  let chatbotContainerElement;
  let closeChatbotBtn;
  let historyBtn;
  let chatHistoryDropdown;
  
  // Variables
  let currentChatId = generateId();
  let chats = JSON.parse(localStorage.getItem('agriJarvisChats')) || {};
  let isProcessing = false;
  let controller = null; // For AbortController
  let recognition = null; // For speech recognition
  let speechSynth = window.speechSynthesis; // For speech synthesis
  let isVisible = false; // Track chatbot visibility
  let isHistoryVisible = false; // Track history visibility
  let lastResponseText = ''; // Store last response for voice playback
  let lastAnalyzedImage = null;
  let lastImageAnalysis = null;

  // Update the mobile styles section to ensure proper spacing and scrolling
  const additionalCSS = `
    @media (max-width: 768px) {
      .chatbot-container {
        width: 90%;
        height: 85vh; 
        max-height: 85vh;
        left: 5%;
        right: 5%;
        bottom: 10vh;
      }
      
      .chat-history-dropdown {
        top: 100px;
      }
      
      .chat-history-dropdown.visible {
        max-height: 180px;
      }
      
      .chatbot-body {
        transition: margin-top 0.4s ease;
      }
    }
    
    /* Scrollbar styling */
    .chatbot-messages::-webkit-scrollbar {
      width: 6px;
    }
    
    .chatbot-messages::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    
    .chatbot-messages::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;
    }
    
    .chatbot-messages::-webkit-scrollbar-thumb:hover {
      background: #a8a8a8;
    }
    
    /* Additional message styling */
    .bot-message::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: -8px;
      width: 16px;
      height: 16px;
      background-color: #f5f5f5;
      transform: translateY(50%) rotate(45deg);
      border-radius: 2px;
      z-index: -1;
    }
    
    .user-message::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: -8px;
      width: 16px;
      height: 16px;
      background-color: #e3f2fd;
      transform: translateY(50%) rotate(45deg);
      border-radius: 2px;
      z-index: -1;
    }
  `;

  // Function to modify the displayWelcomeMessage to include welcome emojis
  function displayWelcomeMessage() {
    const welcomeMessage = "Hello! I'm AgriJarvis, your advanced agricultural assistant. I can help with soil analysis, crop recommendations, irrigation, pest management, fertilizers, farming technology, weather impact, and more. How can I assist with your farming needs today?";
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'bot-message', 'welcome-message');
    messageElement.innerHTML = `
      <strong>Welcome to AgriJarvis! 🌱🌿🚜</strong>
      <p>${welcomeMessage}</p>
      <p><em>You can ask me about:</em></p>
      <ul style="margin-top: 5px; padding-left: 20px;">
        <li>Soil types and crop recommendations</li>
        <li>Pest and disease identification</li>
        <li>Irrigation and water management</li>
        <li>Fertilizer selection and application</li>
        <li>Modern farming technologies</li>
        <li>Weather impacts on agriculture</li>
      </ul>
      <p><em>You can also upload images of crops, soil, or pests for analysis!</em></p>
    `;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Save message to chat history
    if (chats[currentChatId] && !chats[currentChatId].messages) {
      chats[currentChatId].messages = [];
    }
    
    if (chats[currentChatId]) {
      chats[currentChatId].messages.push({
        type: 'bot',
        content: messageElement.innerHTML,
        timestamp: new Date().toISOString()
      });
      saveChats();
    }
  }

  // Add additional CSS to the document
  function injectAdditionalCSS() {
    const styleElement = document.createElement('style');
    styleElement.textContent = additionalCSS;
    document.head.appendChild(styleElement);
  }

  // Wait for all elements to load and then append the chatbot at the end
  window.addEventListener('load', () => {
    // Load Font Awesome
    loadFontAwesome();
    
    // Append chatbot container to body
    document.body.appendChild(chatbotContainer);
    
    // Inject additional CSS
    injectAdditionalCSS();
    
    // Now that the elements are in the DOM, we can select them
    initializeDOMElements();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize the chatbot
    init();
  });
  
  // Initialize DOM elements
  function initializeDOMElements() {
    messagesContainer = document.getElementById('chatbot-messages');
    userInput = document.getElementById('user-input');
    sendButton = document.getElementById('send-btn');
    stopButton = document.getElementById('stop-btn');
    voiceButton = document.getElementById('voice-btn');
    newChatButton = document.getElementById('new-chat-btn');
    imageButton = document.getElementById('image-btn');
    imageUpload = document.getElementById('image-upload');
    chatHistoryList = document.getElementById('chat-history-list');
    chatbotToggleBtn = document.querySelector('.chatbot-toggle-btn');
    chatbotContainerElement = document.querySelector('.chatbot-container');
    closeChatbotBtn = document.getElementById('close-chatbot-btn');
    historyBtn = document.getElementById('history-btn');
    chatHistoryDropdown = document.querySelector('.chat-history-dropdown');
  }
  
  // Set up event listeners
  function setupEventListeners() {
    // Toggle chatbot visibility
    chatbotToggleBtn.addEventListener('click', () => {
      isVisible = true;
      // Animate toggle button
      chatbotToggleBtn.style.transform = 'scale(0.8)';
      
      // Delay the chatbot appearance for a smoother transition
      setTimeout(() => {
        chatbotToggleBtn.style.display = 'none';
        chatbotToggleBtn.style.transform = 'scale(1)';
        chatbotContainerElement.classList.add('visible');
        // Focus on input when opened
        setTimeout(() => userInput.focus(), 300);
      }, 200);
    });

    // Close chatbot
    closeChatbotBtn.addEventListener('click', () => {
      // Hide chatbot first
      chatbotContainerElement.classList.remove('visible');
      
      // Delay the toggle button appearance for a smoother transition
      setTimeout(() => {
        chatbotToggleBtn.style.display = 'flex';
        chatbotToggleBtn.style.transform = 'scale(0.8)';
        
        // Add a small animation to the toggle button
        setTimeout(() => {
          chatbotToggleBtn.style.transform = 'scale(1)';
          isVisible = false;
        }, 50);
        
        // Also hide history if it's open
        if (isHistoryVisible) {
          toggleHistory();
        }
      }, 300);
    });

    // Toggle history visibility
    historyBtn.addEventListener('click', toggleHistory);
    
    // Check if Speech Recognition is supported
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        sendMessage();
      };
      
      recognition.onerror = (event) => {
        displayBotMessage('Voice recognition error. Please try again.');
      };
    }
    
    // Event Listeners for the chatbot functionality
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
    
    stopButton.addEventListener('click', stopGeneration);
    
    voiceButton.addEventListener('click', () => {
      if (recognition) {
        // Show visual feedback
        voiceButton.innerHTML = '<i class="fas fa-circle"></i> Listening...';
        voiceButton.style.backgroundColor = '#f44336';
        
        recognition.start();
        displayBotMessage('<i class="fas fa-microphone-alt"></i> Listening... Speak now.');
        
        // Reset button after 5 seconds or when recognition ends
        const resetButton = () => {
          voiceButton.innerHTML = '<i class="fas fa-microphone"></i> Voice';
          voiceButton.style.backgroundColor = '';
        };
        
        setTimeout(resetButton, 5000);
        recognition.onend = resetButton;
      } else {
        displayBotMessage('Speech recognition is not supported in your browser.');
      }
    });
    
    newChatButton.addEventListener('click', createNewChat);
    
    imageButton.addEventListener('click', () => {
      // Show visual feedback
      imageButton.style.backgroundColor = '#2196F3';
      setTimeout(() => {
        imageButton.style.backgroundColor = '';
        imageUpload.click();
      }, 200);
    });
    
    imageUpload.addEventListener('change', handleImageUpload);
  }

  // Initialize
  function init() {
    // Create a new chat if none exists
    if (Object.keys(chats).length === 0) {
      chats[currentChatId] = {
        messages: [],
        title: 'New Chat'
      };
      saveChats();
    } else {
      currentChatId = Object.keys(chats)[0];
    }
    
    updateChatHistoryList();
    displayWelcomeMessage();
  }

  // Helper Functions
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
  function saveChats() {
    localStorage.setItem('agriJarvisChats', JSON.stringify(chats));
    updateChatHistoryList();
  }
  
  function updateChatHistoryList() {
    chatHistoryList.innerHTML = '';
    
    if (Object.keys(chats).length === 0) {
      const emptyItem = document.createElement('li');
      emptyItem.className = 'empty-history';
      emptyItem.innerHTML = '<i class="fas fa-info-circle"></i> No chat history yet';
      chatHistoryList.appendChild(emptyItem);
      return;
    }
    
    Object.entries(chats).forEach(([id, chat]) => {
      const li = document.createElement('li');
      
      // Get the date from the timestamp of the first message
      let dateString = 'New Chat';
      if (chat.messages && chat.messages.length > 0) {
        const timestamp = new Date(chat.messages[0].timestamp);
        dateString = timestamp.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      }
      
      li.innerHTML = `
        <span class="chat-title">${chat.title || 'Untitled Chat'}</span>
        <span class="chat-date">${dateString}</span>
      `;
      li.dataset.chatId = id;
      
      if (id === currentChatId) {
        li.classList.add('active');
      }
      
      li.addEventListener('click', () => {
        currentChatId = id;
        loadChat(id);
        // Hide history after selection
        toggleHistory();
      });
      
      chatHistoryList.appendChild(li);
    });
    
    // Add CSS for chat items
    if (!document.getElementById('chat-history-styles')) {
      const style = document.createElement('style');
      style.id = 'chat-history-styles';
      style.textContent = `
        #chat-history-list li {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        #chat-history-list li .chat-title {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        #chat-history-list li .chat-date {
          font-size: 12px;
          color: #666;
          margin-left: 10px;
        }
        #chat-history-list .empty-history {
          color: #666;
          font-style: italic;
          text-align: center;
          padding: 15px;
        }
        #chat-history-list .empty-history i {
          margin-right: 5px;
          color: #4CAF50;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  function loadChat(chatId) {
    currentChatId = chatId;
    messagesContainer.innerHTML = '';
    
    if (chats[chatId] && chats[chatId].messages) {
      chats[chatId].messages.forEach(message => {
        if (message.type === 'user') {
          displayUserMessage(message.content);
        } else {
          // Check if this is a welcome message by looking at content
          if (message.content.includes('Welcome to AgriJarvis')) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', 'bot-message', 'welcome-message');
            messageElement.innerHTML = message.content;
            messagesContainer.appendChild(messageElement);
          } else {
            displayBotMessage(message.content);
          }
        }
      });
    }
    
    updateChatHistoryList();
  }
  
  function createNewChat() {
    // Show visual feedback on button
    newChatButton.style.backgroundColor = 'rgba(255,255,255,0.4)';
    setTimeout(() => {
      newChatButton.style.backgroundColor = '';
    }, 300);
    
    const newChatId = generateId();
    chats[newChatId] = {
      messages: [],
      title: 'New Chat'
    };
    
    currentChatId = newChatId;
    messagesContainer.innerHTML = '';
    displayWelcomeMessage();
    saveChats();
    
    // If history is visible, hide it
    if (isHistoryVisible) {
      toggleHistory();
    }
  }
  
  function displayUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user-message');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Save message to chat history
    if (!chats[currentChatId].messages) {
      chats[currentChatId].messages = [];
    }
    
    chats[currentChatId].messages.push({
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    });
    
    // Update chat title if it's the first message
    if (chats[currentChatId].messages.length === 1) {
      chats[currentChatId].title = message.substring(0, 20) + (message.length > 20 ? '...' : '');
      saveChats();
    }
  }
  
  function displayBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'bot-message');
    messageElement.innerHTML = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Save message to chat history
    if (chats[currentChatId] && !chats[currentChatId].messages) {
      chats[currentChatId].messages = [];
    }
    
    if (chats[currentChatId]) {
      chats[currentChatId].messages.push({
        type: 'bot',
        content: message,
        timestamp: new Date().toISOString()
      });
      saveChats();
    }
  }
  
  // Function to display loading animation
  function displayLoadingMessage() {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'bot-message', 'loading-message');
    
    const loadingAnimation = document.createElement('div');
    loadingAnimation.classList.add('loading-animation');
    
    const loadingText = document.createElement('span');
    loadingText.textContent = 'AgriJarvis is thinking...';
    
    messageElement.appendChild(loadingAnimation);
    messageElement.appendChild(loadingText);
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    return messageElement;
  }

  function isAgricultureRelated(query) {
    const agricultureKeywords = [
      // General farming terms
      'farm', 'farming', 'crop', 'crops', 'plant', 'plants', 'soil', 'seeds',
      'harvest', 'agriculture', 'agricultural', 'fertilizer', 'irrigation',
      'pesticide', 'organic', 'greenhouse', 'livestock', 'cattle', 'dairy',
      'poultry', 'horticulture', 'cultivation', 'agronomy', 'farmer', 'field',
      
      // Soil related
      'soil', 'soil type', 'soil test', 'soil health', 'soil fertility', 'soil pH', 
      'soil erosion', 'soil conservation', 'soil structure', 'soil texture', 'loam', 
      'clay', 'sandy soil', 'silt', 'topsoil', 'subsoil', 'compost', 'mulch',
      
      // Crop recommendation and management
      'crop recommendation', 'best crop', 'suitable crop', 'crop rotation', 'crop yield',
      'crop production', 'crop variety', 'crop management', 'crop calendar', 
      'planting season', 'sowing time', 'harvest time', 'germination', 'seedling',
      'crop protection', 'crop planning', 'high-yield crops', 'cash crop',
      
      // Irrigation
      'irrigation', 'water management', 'drip irrigation', 'sprinkler', 'flood irrigation',
      'furrow irrigation', 'water conservation', 'water efficiency', 'watering schedule',
      'irrigation system', 'water requirement', 'water stress', 'water source',
      
      // Pest and disease management
      'pest', 'disease', 'insect', 'fungus', 'bacteria', 'virus', 'nematode', 
      'weed', 'pesticide', 'herbicide', 'fungicide', 'insecticide', 'biological control',
      'integrated pest management', 'IPM', 'pest resistance', 'blight', 'rust', 'mildew',
      'pest control', 'crop disease', 'plant disease', 'pest monitoring',
      
      // Fertilizers and nutrients
      'fertilizer', 'nutrient', 'NPK', 'nitrogen', 'phosphorus', 'potassium',
      'micronutrient', 'organic fertilizer', 'chemical fertilizer', 'biofertilizer',
      'compost', 'manure', 'foliar spray', 'nutrient deficiency', 'soil amendment',
      'lime', 'gypsum', 'urea', 'fertilizer application', 'fertilizer schedule',
      
      // Farming technology
      'agtech', 'agritech', 'smart farming', 'precision agriculture', 'digital farming',
      'drone', 'satellite', 'GPS', 'sensors', 'automation', 'robotics', 'IoT', 
      'farm management software', 'weather station', 'remote sensing', 'vertical farming',
      'hydroponics', 'aeroponics', 'aquaponics', 'controlled environment',
      
      // Weather and climate
      'weather', 'climate', 'forecast', 'rainfall', 'precipitation', 'temperature',
      'humidity', 'drought', 'flood', 'frost', 'heat stress', 'climate change',
      'monsoon', 'seasonal', 'weather pattern', 'weather forecast', 'weather alert',
      
      // Specific crops
      'rice', 'wheat', 'maize', 'corn', 'soybean', 'cotton', 'sugarcane', 'potato',
      'tomato', 'onion', 'garlic', 'chili', 'pepper', 'brinjal', 'eggplant', 'okra',
      'cauliflower', 'cabbage', 'carrot', 'radish', 'spinach', 'lettuce', 'pea',
      'bean', 'lentil', 'gram', 'groundnut', 'peanut', 'sunflower', 'mustard',
      'mango', 'banana', 'citrus', 'orange', 'lemon', 'apple', 'grape', 'watermelon',
      
      // Hindi terms (expanded)
      'कृषि', 'खेती', 'फसल', 'पौधा', 'मिट्टी', 'बीज', 'उर्वरक', 'सिंचाई',
      'कीटनाशक', 'जैविक', 'पशुधन', 'मवेशी', 'डेयरी', 'बागवानी', 'किसान', 'खेत',
      'मृदा', 'फसल सिफारिश', 'उत्पादन', 'जल प्रबंधन', 'कीट नियंत्रण', 'रोग प्रबंधन',
      'पोषक तत्व', 'मौसम', 'जलवायु', 'आधुनिक कृषि', 'कृषि प्रौद्योगिकी'
    ];
    
    const lowerQuery = query.toLowerCase();
    return agricultureKeywords.some(keyword => lowerQuery.includes(keyword.toLowerCase()));
  }

  // Function to check if message is a greeting
  function isGreeting(message) {
    const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'howdy', 'namaste', 'hola'];
    const lowerMessage = message.toLowerCase().trim();
    
    // Only return true if the message is exactly a greeting or starts with a greeting followed by punctuation
    return greetings.some(greeting => 
      lowerMessage === greeting || 
      lowerMessage === greeting + '.' || 
      lowerMessage === greeting + '!' ||
      lowerMessage === greeting + '?'
    );
  }
  
  async function analyzeImage(imageData) {
    try {
      // First check if image is agricultural
      const isAgriculturalResponse = await callGeminiWithImage(
        imageData,
        "Is this image related to agriculture, farming, crops, or livestock? Answer with only 'yes' or 'no'."
      );
      
      console.log("Image analysis response:", isAgriculturalResponse);
      
      // Check if the response includes 'yes'
      const isAgricultural = isAgriculturalResponse.toLowerCase().includes('yes');
      
      let analysis = null;
      
      // If it's agricultural, get detailed analysis
      if (isAgricultural) {
        analysis = await callGeminiWithImage(
          imageData,
          "Analyze this agricultural image in detail. Identify crops, plants, farming equipment, or agricultural practices visible. If you see any plant diseases or pests, describe them. Provide key observations numbered in a list format."
        );
      }
      
      return {
        isAgricultural: isAgricultural,
        analysis: analysis
      };
    } catch (error) {
      console.error("Error analyzing image:", error);
      return {
        isAgricultural: false,
        analysis: null
      };
    }
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Display uploaded image
    const reader = new FileReader();
    reader.onload = async (event) => {
      const imagePreview = document.createElement('div');
      imagePreview.classList.add('message', 'user-message');
      
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-preview-container');
      imagePreview.appendChild(imageContainer);
      
      const img = document.createElement('img');
      img.src = event.target.result;
      img.classList.add('image-preview');
      img.addEventListener('click', () => {
        // Create a larger view of the image when clicked
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '2000';
        
        const modalImg = document.createElement('img');
        modalImg.src = event.target.result;
        modalImg.style.maxWidth = '90%';
        modalImg.style.maxHeight = '90%';
        modalImg.style.objectFit = 'contain';
        
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', () => {
          document.body.removeChild(modal);
        });
      });
      
      imageContainer.appendChild(img);
      messagesContainer.appendChild(imagePreview);
      
      // Save to chat history
      if (!chats[currentChatId].messages) {
        chats[currentChatId].messages = [];
      }
      
      chats[currentChatId].messages.push({
        type: 'user',
        content: 'Image uploaded',
        imageData: event.target.result,
        timestamp: new Date().toISOString()
      });
      
      saveChats();
      
      // Show loading animation on the image
      const loadingIndicator = document.createElement('div');
      loadingIndicator.classList.add('image-analysis-loading');
      loadingIndicator.innerHTML = '<div class="loading-animation"></div> Analyzing image...';
      imageContainer.appendChild(loadingIndicator);
      
      // Store the image data for follow-up questions
      lastAnalyzedImage = event.target.result;
      
      // Analyze the image
      const analysisResult = await analyzeImage(event.target.result);
      
      // Store the analysis for follow-up questions
      lastImageAnalysis = analysisResult.analysis;
      
      // Remove loading indicator
      imageContainer.removeChild(loadingIndicator);
      
      // Display the analysis
      let responseMessage;
      const botMessage = document.createElement('div');
      botMessage.classList.add('message', 'bot-message');
      
      if (analysisResult.isAgricultural) {
        const analysisHTML = formatAnalysisResult(analysisResult.analysis);
        botMessage.innerHTML = analysisHTML;
        responseMessage = analysisResult.analysis;
        
        // Update chat title with image info if it's the first message
        if (chats[currentChatId].messages.length <= 2) {
          const titleText = analysisResult.analysis.split('\n')[0] || 'Agricultural Image Analysis';
          chats[currentChatId].title = titleText.substring(0, 30) + (titleText.length > 30 ? '...' : '');
          saveChats();
        }
      } else {
        botMessage.textContent = "I'm sorry, I'm designed to help with agriculture-related queries only. This image doesn't appear to be related to agriculture.";
        responseMessage = botMessage.textContent;
        // Clear the stored image data since it's not agricultural
        lastAnalyzedImage = null;
        lastImageAnalysis = null;
      }
      
      messagesContainer.appendChild(botMessage);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      
      // Save bot message to chat history
      chats[currentChatId].messages.push({
        type: 'bot',
        content: botMessage.innerHTML,
        timestamp: new Date().toISOString()
      });
      saveChats();
      
      // Store response for voice playback
      lastResponseText = responseMessage.replace(/<[^>]*>/g, '');
      // Play voice response
      speakText(lastResponseText);
    };
    
    reader.readAsDataURL(file);
  }
  
  function formatAnalysisResult(analysis) {
    // Try to create a more structured display of the analysis
    let formattedHTML = '<div class="analysis-result">';
    formattedHTML += '<h3>Agricultural Image Analysis</h3>';
    
    // Replace numbered lists with HTML lists if they exist
    const listPattern = /(\d+)\.\s+([^\n]+)/g;
    const hasNumberedList = listPattern.test(analysis);
    
    if (hasNumberedList) {
      formattedHTML += '<ul>';
      // Reset the regex because we used test() which advances the lastIndex
      listPattern.lastIndex = 0;
      
      let match;
      while ((match = listPattern.exec(analysis)) !== null) {
        formattedHTML += `<li><strong>${match[2]}</strong></li>`;
      }
      
      formattedHTML += '</ul>';
      
      // Add any remaining text that wasn't part of the numbered list
      const remainingText = analysis.split(/\d+\.\s+[^\n]+\n/).filter(text => text.trim().length > 0);
      if (remainingText.length > 0) {
        remainingText.forEach(text => {
          formattedHTML += `<p>${text.trim()}</p>`;
        });
      }
    } else {
      // If there's no numbered list, just format paragraphs
      const paragraphs = analysis.split('\n\n');
      paragraphs.forEach(para => {
        if (para.trim().length > 0) {
          formattedHTML += `<p>${para.trim()}</p>`;
        }
      });
    }
    
    formattedHTML += '<p><em>You can ask follow-up questions about this image.</em></p>';
    formattedHTML += '</div>';
    
    return formattedHTML;
  }
  
  // Check if a message is asking about a recently uploaded image
  function isAskingAboutImage(message) {
    const imageQuestionPatterns = [
      'what is this', 'what do you see', 'analyze this', 'tell me about this', 'what about this',
      'what\'s in the image', 'what\'s in this image', 'what can you tell me about this',
      'more information', 'more details', 'further analysis', 'what plant', 'what crop',
      'image', 'picture', 'photo', 'disease', 'pest', 'treatment', 'resolution', 'remedy',
      'fertilizer', 'recommendation', 'identify', 'tell me more'
    ];
    
    const lowerMessage = message.toLowerCase();
    return (lastAnalyzedImage !== null) && 
           (imageQuestionPatterns.some(pattern => lowerMessage.includes(pattern)) ||
            lowerMessage.length < 15); // Short messages like "what is it?" after an image
  }
  
  async function sendMessage() {
    const message = userInput.value.trim();
    if (message === '' && !isProcessing) return;
    
    if (isProcessing) {
      stopGeneration();
      return;
    }
    
    displayUserMessage(message);
    userInput.value = '';
    
    // Handle greetings
    if (isGreeting(message)) {
      let greetingResponse = `Hello there! I'm AgriJarvis, your agriculture assistant. How can I help you with your farming questions today?`;
      displayBotMessage(greetingResponse);
      
      // Store and speak response
      lastResponseText = greetingResponse;
      speakText(greetingResponse);
      return;
    }
    
    // Special case for "who developed you"
    if (message.toLowerCase().includes('who developed you') || 
        message.toLowerCase().includes('who made you') || 
        message.toLowerCase().includes('who created you')) {
      let devResponse = "Hey I am AgriJarvis sir, developed by team Stark";
      displayBotMessage(devResponse);
      
      // Store and speak response
      lastResponseText = devResponse;
      speakText(devResponse);
      return;
    }
    
    // Check if user is asking about a recently uploaded image
    if (isAskingAboutImage(message)) {
      await processImageFollowUpQuestion(message);
      return;
    }
    
    // Check if query is agriculture-related
    if (!isAgricultureRelated(message) && !message.toLowerCase().includes('agrijarvis')) {
      let notAgriResponse = "I'm sorry, I'm designed to help with agriculture-related queries only. Please ask me about farming, crops, soil, or any other agricultural topic.";
      displayBotMessage(notAgriResponse);
      
      // Store and speak response
      lastResponseText = notAgriResponse;
      speakText(notAgriResponse);
      return;
    }
    
    // Process the message and get response
    await processMessage(message);
  }
  
  // Global variables for response handling
  let tempMessageElement = null;
  let fullResponseText = '';
  
  async function processMessage(message) {
    isProcessing = true;
    sendButton.style.display = 'none';
    stopButton.style.display = 'inline-block';
    
    // Reset response variables
    tempMessageElement = null;
    fullResponseText = '';
    
    // Create a temporary message element for the response
    const loadingMessage = displayLoadingMessage();
    
    try {
      controller = new AbortController();
      const signal = controller.signal;
      
      // Call the Gemini API with a chunk handler to update the UI
      const response = await callGeminiAPI(message, signal, (chunk) => {
        // If this is the first chunk, remove the loading message
        if (loadingMessage) {
          loadingMessage.remove();
        }
        
        // Create response message if it doesn't exist
        if (!tempMessageElement) {
          tempMessageElement = document.createElement('div');
          tempMessageElement.classList.add('message', 'bot-message');
          messagesContainer.appendChild(tempMessageElement);
        }
        
        // Update the message with the full response at once
        tempMessageElement.innerHTML = chunk;
        fullResponseText = chunk;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      });
      
      // Save the complete response to chat history
      if (chats[currentChatId] && chats[currentChatId].messages) {
        if (loadingMessage) {
          loadingMessage.remove();
        }
        
        // If we never created a temp message element (no chunks received)
        if (!tempMessageElement && response) {
          fullResponseText = response;
          displayBotMessage(fullResponseText);
        } else if (!tempMessageElement) {
          fullResponseText = "I'm sorry, I couldn't process that request.";
          displayBotMessage(fullResponseText);
        }
        
        // Update chat history (this is already handled by displayBotMessage if we called it)
        if (tempMessageElement) {
          chats[currentChatId].messages.push({
            type: 'bot',
            content: tempMessageElement.innerHTML,
            timestamp: new Date().toISOString()
          });
          saveChats();
        }
      }
      
      // Save response for voice playback
      lastResponseText = fullResponseText.replace(/<[^>]*>/g, '');
      
      // Play voice response after response is complete
      speakText(lastResponseText);
      
    } catch (error) {
      if (loadingMessage) {
        loadingMessage.remove();
      }
      
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        console.error('Error processing message:', error);
        let errorMsg = 'Sorry, I encountered an error. Please try again.';
        displayBotMessage(errorMsg);
        lastResponseText = errorMsg;
        speakText(errorMsg);
      }
    } finally {
      isProcessing = false;
      sendButton.style.display = 'inline-block';
      stopButton.style.display = 'none';
    }
  }
  
  // Function to handle follow-up questions about images
  async function processImageFollowUpQuestion(question) {
    isProcessing = true;
    sendButton.style.display = 'none';
    stopButton.style.display = 'inline-block';
    
    // Show loading animation
    const loadingMessage = displayLoadingMessage();
    
    try {
      let response;
      
      if (lastImageAnalysis) {
        // If we already have analysis, use it as context
        response = await callGeminiAPI(
          `Based on this agricultural image analysis: "${lastImageAnalysis}"\n\nUser question: "${question}"\n\nPlease provide a detailed answer focusing only on information that can be inferred from the analysis.`,
          null,
          null
        );
      } else if (lastAnalyzedImage) {
        // If we need to analyze the image again with the new question
        response = await callGeminiWithImage(
          lastAnalyzedImage,
          `Please analyze this agricultural image to answer the following question: ${question}`
        );
      } else {
        response = "I'm sorry, I don't have an image to reference. Please upload an agricultural image first.";
      }
      
      // Remove loading message
      loadingMessage.remove();
      
      // Display the response
      displayBotMessage(response);
      
      // Save to chat history
      if (chats[currentChatId] && chats[currentChatId].messages) {
        chats[currentChatId].messages.push({
          type: 'bot',
          content: response,
          timestamp: new Date().toISOString()
        });
        saveChats();
      }
      
      // Store and speak response
      lastResponseText = response.replace(/<[^>]*>/g, '');
      speakText(lastResponseText);
      
    } catch (error) {
      console.error('Error processing image follow-up:', error);
      
      if (loadingMessage) {
        loadingMessage.remove();
      }
      
      let errorMsg = 'Sorry, I encountered an error analyzing the image. Please try again.';
      displayBotMessage(errorMsg);
      lastResponseText = errorMsg;
      speakText(errorMsg);
    } finally {
      isProcessing = false;
      sendButton.style.display = 'inline-block';
      stopButton.style.display = 'none';
    }
  }
  
  function stopGeneration() {
    if (controller) {
      controller.abort();
      controller = null;
      
      // Add a "stopped" message to the current response
      if (tempMessageElement) {
        tempMessageElement.innerHTML += '<p><em>(Response stopped)</em></p>';
        
        // Update chat history with the partial response
        if (chats[currentChatId] && chats[currentChatId].messages) {
          chats[currentChatId].messages.push({
            type: 'bot',
            content: tempMessageElement.innerHTML,
            timestamp: new Date().toISOString()
          });
          saveChats();
        }
      }
      
      isProcessing = false;
      sendButton.style.display = 'inline-block';
      stopButton.style.display = 'none';
    }
  }
  
  function speakText(text) {
    // Stop any ongoing speech
    speechSynth.cancel();
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9; // Slightly slower than default
      speechSynth.speak(utterance);
    }
  }
  
  // API Calls
  async function callGeminiAPI(query, signal, onChunk) {
    const apiKey = activeGeminiKey;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const data = {
      contents: [{
        parts: [{
          text: `You are AgriJarvis, an advanced AI assistant that specializes in agriculture with deep expertise in all farming domains.

EXPERTISE AREAS:
1. Soil Analysis & Management: Provide soil type identification, soil testing guidance, and management practices for various soil conditions.
2. Crop Recommendations: Suggest suitable crops based on soil type, climate, and region.
3. Irrigation & Water Management: Advise on efficient irrigation systems, water conservation, and watering schedules.
4. Pest & Disease Management: Identify and recommend treatments for crop pests and diseases.
5. Fertilizers & Nutrients: Guide on proper fertilizer selection, application rates, and schedules.
6. Modern Farming Technology: Explain precision agriculture, farm automation, and AgTech innovations.
7. Weather Impact & Forecasting: Discuss how weather affects crops and how to prepare for weather events.
8. Sustainable & Organic Farming: Provide guidance on eco-friendly farming practices.
9. Livestock & Animal Husbandry: Answer questions about animal care, feeding, and management.
10. Farm Economics: Help with understanding crop pricing, market trends, and farm profitability.

RESPONSE GUIDELINES:
- When asked about soil types, include specific crop recommendations suitable for that soil.
- For crop questions, mention optimal growing conditions, common pests/diseases, and yield expectations.
- With pest management questions, suggest both chemical and organic/biological control methods.
- For technology questions, explain both benefits and implementation challenges.
- Always consider sustainable practices in your recommendations.
- If asked in Hindi, respond in Hindi. Otherwise, respond in English.
- Provide practical, actionable advice that farmers can implement.
- If a query is not related to agriculture, politely decline to answer.

Query: ${query}`
        }]
      }]
    };
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        signal: signal
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
      }
      
      // Process the response
      const result = await response.json();
      
      // Check if result has the expected structure
      if (result.candidates && result.candidates[0] && result.candidates[0].content) {
        const text = result.candidates[0].content.parts[0].text;
        
        // If onChunk is provided, send the entire text at once
        if (onChunk && typeof onChunk === 'function') {
          onChunk(text);
        }
        
        return text;
      } else {
        console.error('Unexpected response format:', result);
        return 'I apologize, but I encountered an issue processing your request.';
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
        return 'Request stopped.';
      }
      
      console.error('Error calling Gemini API:', error);
      return `I'm sorry, I encountered an error: ${error.message}`;
    }
  }
  
  async function callGeminiWithImage(imageData, query) {
    const apiKey = activeGeminiKey;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-vision:generateContent?key=${apiKey}`;
    
    // Remove the data URL prefix
    const base64Image = imageData.split(',')[1];
    
    const data = {
      contents: [{
        parts: [
          { text: `As AgriJarvis, an agricultural expert AI assistant, analyze this image with the following question: ${query}

If this is an agricultural image, include details about:
1. Plant/crop identification
2. Growth stage and health status
3. Any visible pests, diseases, or nutrient deficiencies
4. Soil condition (if visible)
5. Relevant farming practices or equipment shown
6. Recommendations based on what you see

If analyzing soil, assess:
- Soil type and texture
- Potential fertility indicators
- Suitable crops for this soil type
- Recommended amendments if needed

For crop analysis, include:
- Variety identification if possible
- Expected yield considerations
- Optimal growing conditions
- Management recommendations` },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: base64Image
            }
          }
        ]
      }]
    };
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.candidates && result.candidates[0].content) {
        return result.candidates[0].content.parts[0].text;
      }
      
      console.error('Unexpected response format:', result);
      return 'I apologize, but I encountered an issue analyzing the image.';
    } catch (error) {
      console.error('Error calling Gemini API with image:', error);
      return 'Error: ' + error.message;
    }
  }

  // Fallback API call if needed
  async function callOpenAIAPI(query) {
    const apiKey = activeOpenAIKey;
    const url = 'https://api.openai.com/v1/chat/completions';
    
    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are AgriJarvis, an AI assistant that specializes in agriculture. Only answer questions related to agriculture, farming, crops, livestock, and related topics."
        },
        {
          role: "user",
          content: query
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    };
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (result.choices && result.choices[0].message) {
        return result.choices[0].message.content;
      }
      
      return '';
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return '';
    }
  }

  // Toggle history visibility
  function toggleHistory() {
    isHistoryVisible = !isHistoryVisible;
    
    if (isHistoryVisible) {
      chatHistoryDropdown.classList.add('visible');
      // Highlight the history button
      historyBtn.style.backgroundColor = 'rgba(255,255,255,0.4)';
      
      // Add margin to chatbot body to make space for history dropdown
      document.querySelector('.chatbot-body').style.marginTop = '250px';
    } else {
      chatHistoryDropdown.classList.remove('visible');
      // Remove highlight from history button
      historyBtn.style.backgroundColor = '';
      
      // Remove margin from chatbot body
      document.querySelector('.chatbot-body').style.marginTop = '0';
    }
  }
});

