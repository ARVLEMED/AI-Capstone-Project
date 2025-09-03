// Global variables
let selectedRating = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupEventListeners();
    loadStats();
    checkTodaysMood();
}

// Set up all event listeners
function setupEventListeners() {
    // Mood scale selection
    document.querySelectorAll('.mood-option').forEach(option => {
        option.addEventListener('click', handleMoodSelection);
    });
    
    // Log mood button
    document.getElementById('logMoodBtn').addEventListener('click', handleLogMood);
    
    // Load history button
    document.getElementById('loadHistoryBtn').addEventListener('click', handleLoadHistory);
    
    // Enter key support for note input
    document.getElementById('moodNote').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleLogMood();
        }
    });
}

// Handle mood selection
function handleMoodSelection(event) {
    document.querySelectorAll('.mood-option').forEach(opt => opt.classList.remove('selected'));
    event.target.classList.add('selected');
    selectedRating = parseInt(event.target.dataset.rating);
}

// Handle mood logging
async function handleLogMood() {
    if (!selectedRating) {
        showMessage('Please select a mood rating!', 'error');
        return;
    }
    
    const note = document.getElementById('moodNote').value.trim();
    const btn = document.getElementById('logMoodBtn');
    
    // Show loading state
    btn.classList.add('loading');
    btn.disabled = true;
    
    try {
        const response = await fetch('/api/mood', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rating: selectedRating,
                note: note
            })
        });
        
        if (response.ok) {
            showMessage('Mood logged successfully! ✨', 'success');
            await loadStats();
            document.getElementById('moodNote').value = '';
        } else {
            const errorData = await response.text();
            showMessage('Error logging mood. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error connecting to server.', 'error');
    } finally {
        // Remove loading state
        btn.classList.remove('loading');
        btn.disabled = false;
    }
}

// Load mood statistics
async function loadStats() {
    try {
        const response = await fetch('/api/mood/stats');
        const stats = await response.json();
        
        document.getElementById('statsContent').innerHTML = `
            <div class="stat-item">
                <span>Average Rating:</span>
                <span><strong>${stats.averageRating || 'N/A'}/10</strong></span>
            </div>
            <div class="stat-item">
                <span>Good Days (7+):</span>
                <span><strong>${stats.goodDaysCount || 0} days</strong></span>
            </div>
            <div class="stat-item">
                <span>Period:</span>
                <span>${stats.period}</span>
            </div>
        `;
    } catch (error) {
        console.error('Error loading stats:', error);
        document.getElementById('statsContent').innerHTML = '<p>Error loading stats</p>';
    }
}

// Handle loading history
async function handleLoadHistory() {
    const btn = document.getElementById('loadHistoryBtn');
    btn.classList.add('loading');
    btn.disabled = true;
    
    try {
        const response = await fetch('/api/mood/history?days=7');
        const history = await response.json();
        
        if (history.length === 0) {
            document.getElementById('historyContent').innerHTML = 
                '<p>No mood entries yet. Start logging your moods!</p>';
        } else {
            document.getElementById('historyContent').innerHTML = history.map(mood => `
                <div class="history-item">
                    <div>
                        <strong>${formatDate(mood.date)}</strong>
                        <div style="font-size: 0.9rem; color: #666; margin-top: 0.25rem;">
                            ${mood.note || 'No note'}
                        </div>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <span class="mood-emoji">${getMoodEmoji(mood.rating)}</span>
                        <strong>${mood.rating}/10</strong>
                    </div>
                </div>
            `).join('');
        }
        
        document.getElementById('history').style.display = 'block';
        btn.textContent = 'Refresh History';
    } catch (error) {
        console.error('Error loading history:', error);
        showMessage('Error loading history.', 'error');
    } finally {
        btn.classList.remove('loading');
        btn.disabled = false;
    }
}

// Check if there's already a mood logged for today
async function checkTodaysMood() {
    try {
        const response = await fetch('/api/mood/today');
        if (response.ok) {
            const mood = await response.json();
            selectedRating = mood.rating;
            document.querySelector(`[data-rating="${mood.rating}"]`).classList.add('selected');
            document.getElementById('moodNote').value = mood.note || '';
            showMessage('Today\'s mood already logged. Update it if you want!', 'success');
        }
    } catch (error) {
        console.error('Error checking today\'s mood:', error);
    }
}

// Utility functions
function showMessage(text, type) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    messageEl.style.display = 'block';
    
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 4000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }
}

function getMoodEmoji(rating) {
    const emojiMap = {
        1: '😢', 2: '😞', 3: '😕', 4: '😐', 5: '😐',
        6: '🙂', 7: '🙂', 8: '😊', 9: '😄', 10: '🤩'
    };
    return emojiMap[rating] || '😐';
}

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatDate,
        getMoodEmoji,
        showMessage
    };
}