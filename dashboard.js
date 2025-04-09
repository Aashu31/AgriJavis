document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navbarMenu.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current section in viewport
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Profile dropdown for mobile
    const profileTrigger = document.querySelector('.profile-trigger');
    if (profileTrigger) {
        profileTrigger.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.querySelector('.dropdown-content');
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }
        });
    }
});

// Hero Section Video Fallback
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-video');
    
    // Check if video can play, if not show fallback
    if (heroVideo) {
        heroVideo.addEventListener('error', function() {
            const fallback = this.querySelector('.hero-fallback');
            if (fallback) {
                this.style.display = 'none';
                fallback.style.display = 'block';
            }
        });
        
        // For mobile devices that don't autoplay videos
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            heroVideo.play().catch(error => {
                const fallback = heroVideo.querySelector('.hero-fallback');
                if (fallback) {
                    heroVideo.style.display = 'none';
                    fallback.style.display = 'block';
                }
            });
        }
    }
    
    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight - 70, // Account for navbar
                behavior: 'smooth'
            });
        });
    }
});

// Tab functionality for crop assistance
document.addEventListener('DOMContentLoaded', function() {
    // Crop tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const cropCategories = document.querySelectorAll('.crop-category');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and categories
            tabButtons.forEach(btn => btn.classList.remove('active'));
            cropCategories.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding category
            const categoryId = this.getAttribute('data-category');
            const activeCategory = document.getElementById(categoryId);
            if (activeCategory) {
                activeCategory.classList.add('active');
            }
        });
    });
    
    // Weather location selectors
    const stateSelect = document.getElementById('state-select');
    const districtSelect = document.getElementById('district-select');
    const citySelect = document.getElementById('city-select');
    
    // Sample data - in real app you would fetch this from an API
    const locationData = {
        'jharkhand': {
            districts: ['Ranchi', 'Dhanbad', 'Jamshedpur', 'Bokaro'],
            cities: {
                'Ranchi': ['Ranchi City', 'Kanke', 'Ormanjhi'],
                'Dhanbad': ['Dhanbad City', 'Jharia', 'Katras'],
                // Add other districts
            }
        },
        // Add other states
    };
    
    stateSelect.addEventListener('change', function() {
        if (this.value) {
            districtSelect.disabled = false;
            districtSelect.innerHTML = '<option value="">Select District</option>';
            
            locationData[this.value].districts.forEach(district => {
                const option = document.createElement('option');
                option.value = district.toLowerCase().replace(' ', '-');
                option.textContent = district;
                districtSelect.appendChild(option);
            });
            
            citySelect.disabled = true;
            citySelect.innerHTML = '<option value="">Select City</option>';
        } else {
            districtSelect.disabled = true;
            citySelect.disabled = true;
        }
    });
    
    districtSelect.addEventListener('change', function() {
        if (this.value && stateSelect.value) {
            citySelect.disabled = false;
            citySelect.innerHTML = '<option value="">Select City</option>';
            
            const districtName = this.options[this.selectedIndex].text;
            locationData[stateSelect.value].cities[districtName].forEach(city => {
                const option = document.createElement('option');
                option.value = city.toLowerCase().replace(' ', '-');
                option.textContent = city;
                citySelect.appendChild(option);
            });
        } else {
            citySelect.disabled = true;
        }
    });
    
    // Current location button
    document.getElementById('current-location').addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    // In a real app, you would reverse geocode to get location
                    alert(`Location found: ${position.coords.latitude}, ${position.coords.longitude}`);
                    // Enable weather button
                    document.getElementById('show-weather').disabled = false;
                },
                error => {
                    alert('Unable to retrieve your location: ' + error.message);
                }
            );
        } else {
            alert('Geolocation is not supported by your browser');
        }
    });
    
    // Show weather button
    document.getElementById('show-weather').addEventListener('click', function() {
        // In a real app, you would fetch weather data from an API
        const weatherMetrics = {
            'wind-speed': '12 km/h',
            'temperature': '28 °C',
            'rain-probability': '30%',
            'humidity': '65%',
            'moisture': '42%'
        };
        
        // Update current weather
        for (const [metric, value] of Object.entries(weatherMetrics)) {
            document.getElementById(metric).textContent = value;
        }
        
        // Generate forecast
        const forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = '';
        
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const weatherIcons = ['☀️', '⛅', '🌧️', '⛈️', '🌦️', '🌤️', '🌫️'];
        
        for (let i = 0; i < 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const dayName = days[date.getDay()];
            
            const forecastDay = document.createElement('div');
            forecastDay.className = 'forecast-day';
            
            const maxTemp = Math.floor(Math.random() * 10) + 25;
            const minTemp = maxTemp - Math.floor(Math.random() * 5) - 2;
            const weatherIcon = weatherIcons[Math.floor(Math.random() * weatherIcons.length)];
            
            forecastDay.innerHTML = `
                <div class="day">${dayName}</div>
                <div class="weather-icon">${weatherIcon}</div>
                <div class="temp">
                    <span class="max-temp">${maxTemp}°</span>
                    <span class="min-temp">${minTemp}°</span>
                </div>
            `;
            
            forecastContainer.appendChild(forecastDay);
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality for crop assistance - FIXED
    const tabButtons = document.querySelectorAll('.tab-btn');
    const cropCategories = document.querySelectorAll('.crop-category');
    
    // Make sure the first tab is active by default
    if (tabButtons.length > 0 && cropCategories.length > 0) {
        tabButtons[0].classList.add('active');
        cropCategories[0].classList.add('active');
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and categories
            tabButtons.forEach(btn => btn.classList.remove('active'));
            cropCategories.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding category
            const categoryId = this.getAttribute('data-category');
            const activeCategory = document.getElementById(categoryId);
            if (activeCategory) {
                activeCategory.classList.add('active');
            } else {
                console.error(`Category with ID ${categoryId} not found`);
            }
        });
    });

    // Location data for top 10 Indian farming states
    const locationData = {
        'andhra-pradesh': {
            districts: ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Nellore', 'Prakasam', 'Srikakulam', 'Visakhapatnam', 'Vizianagaram', 'West Godavari'],
            cities: {
                'Anantapur': ['Anantapur', 'Dharmavaram', 'Hindupur'],
                'Chittoor': ['Chittoor', 'Tirupati', 'Madanapalle'],
                'East Godavari': ['Kakinada', 'Rajahmundry', 'Amalapuram']
            }
        },
        'bihar': {
            districts: ['Araria', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar', 'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar', 'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur', 'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran', 'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran'],
            cities: {
                'Patna': ['Patna', 'Danapur', 'Phulwari Sharif'],
                'Muzaffarpur': ['Muzaffarpur', 'Kanti', 'Meenapur'],
                'Gaya': ['Gaya', 'Bodh Gaya', 'Tekari']
            }
        },
        'gujarat': {
            districts: ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod', 'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana', 'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan', 'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Tapi', 'Vadodara', 'Valsad'],
            cities: {
                'Ahmedabad': ['Ahmedabad', 'Gandhinagar', 'Sanand'],
                'Surat': ['Surat', 'Udhna', 'Choryasi'],
                'Vadodara': ['Vadodara', 'Dabhoi', 'Karjan']
            }
        },
        'karnataka': {
            districts: ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban', 'Bidar', 'Chamarajanagar', 'Chikballapur', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'],
            cities: {
                'Bengaluru Urban': ['Bangalore', 'Yelahanka', 'Kengeri'],
                'Mysuru': ['Mysore', 'Nanjanagud', 'Hunsur'],
                'Belagavi': ['Belgaum', 'Bailhongal', 'Gokak']
            }
        },
        'maharashtra': {
            districts: ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'],
            cities: {
                'Mumbai Suburban': ['Mumbai', 'Bandra', 'Andheri'],
                'Pune': ['Pune', 'Pimpri-Chinchwad', 'Hadapsar'],
                'Nagpur': ['Nagpur', 'Kamptee', 'Katol']
            }
        },
        'madhya-pradesh': {
            districts: ['Agar Malwa', 'Alirajpur', 'Anuppur', 'Ashoknagar', 'Balaghat', 'Barwani', 'Betul', 'Bhind', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Dindori', 'Guna', 'Gwalior', 'Harda', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khandwa', 'Khargone', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Neemuch', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Sidhi', 'Singrauli', 'Tikamgarh', 'Ujjain', 'Umaria', 'Vidisha'],
            cities: {
                'Bhopal': ['Bhopal', 'Berasia', 'Vidisha'],
                'Indore': ['Indore', 'Depalpur', 'Mhow'],
                'Jabalpur': ['Jabalpur', 'Sihora', 'Patan']
            }
        },
        'punjab': {
            districts: ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Pathankot', 'Patiala', 'Rupnagar', 'Sahibzada Ajit Singh Nagar', 'Sangrur', 'Shahid Bhagat Singh Nagar', 'Tarn Taran'],
            cities: {
                'Amritsar': ['Amritsar', 'Ajnala', 'Beas'],
                'Ludhiana': ['Ludhiana', 'Jagraon', 'Khanna'],
                'Patiala': ['Patiala', 'Nabha', 'Rajpura']
            }
        },
        'rajasthan': {
            districts: ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur'],
            cities: {
                'Jaipur': ['Jaipur', 'Chomu', 'Phulera'],
                'Jodhpur': ['Jodhpur', 'Bilara', 'Phalodi'],
                'Udaipur': ['Udaipur', 'Kherwara', 'Salumbar']
            }
        },
        'tamil-nadu': {
            districts: ['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'],
            cities: {
                'Chennai': ['Chennai', 'Ambattur', 'Avadi'],
                'Coimbatore': ['Coimbatore', 'Mettupalayam', 'Pollachi'],
                'Madurai': ['Madurai', 'Melur', 'Thirumangalam']
            }
        },
        'uttar-pradesh': {
            districts: ['Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya', 'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kheri', 'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'],
            cities: {
                'Lucknow': ['Lucknow', 'Malihabad', 'Mohammadpur'],
                'Kanpur Nagar': ['Kanpur', 'Panki', 'Sarsaul'],
                'Varanasi': ['Varanasi', 'Pindra', 'Rohania']
            }
        },
        'west-bengal': {
            districts: ['Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram', 'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur', 'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur'],
            cities: {
                'Kolkata': ['Kolkata', 'Baranagar', 'Garden Reach'],
                'Howrah': ['Howrah', 'Uluberia', 'Bally'],
                'Darjeeling': ['Darjeeling', 'Kurseong', 'Mirik']
            }
        }
    };

    // Weather API configuration
    const WEATHER_API_KEY = 'e47f4b8989827d2bb070dc043e3928e4';
    const GEOLOCATION_API_KEY = '0991712c-5db2-4e84-bfb8-640e4a3dcd39';
    
    // DOM elements
    const stateSelect = document.getElementById('state-select');
    const districtSelect = document.getElementById('district-select');
    const citySelect = document.getElementById('city-select');
    const currentLocationBtn = document.getElementById('current-location');
    const showWeatherBtn = document.getElementById('show-weather');
    
    // Initialize weather section elements display
    const weatherSection = document.getElementById('weather-section');
    if (weatherSection) {
        weatherSection.style.display = 'none';
    }
    
    // Helper function to get weather icon
    function getWeatherIcon(weatherId) {
        if (weatherId >= 200 && weatherId < 300) {
            return '⛈️'; // Thunderstorm
        } else if (weatherId >= 300 && weatherId < 400) {
            return '🌧️'; // Drizzle
        } else if (weatherId >= 500 && weatherId < 600) {
            return '🌧️'; // Rain
        } else if (weatherId >= 600 && weatherId < 700) {
            return '❄️'; // Snow
        } else if (weatherId >= 700 && weatherId < 800) {
            return '🌫️'; // Atmosphere (mist, fog, etc.)
        } else if (weatherId === 800) {
            return '☀️'; // Clear
        } else if (weatherId > 800 && weatherId < 900) {
            return '⛅'; // Clouds
        } else {
            return '🌈'; // Default
        }
    }

    // Weather API error handling function
    function handleWeatherError(error) {
        console.error('Weather API error:', error);
        let errorMessage = 'Failed to load weather data';
        
        if (error.message && error.message.includes('404')) {
            errorMessage = 'Location not found. Please try another city.';
        } else if (error.message && error.message.includes('401')) {
            errorMessage = 'Weather service unavailable. Please try again later.';
        } else if (error.message && error.message.includes('429')) {
            errorMessage = 'Too many requests. Please wait before trying again.';
        } else {
            errorMessage = error.message || errorMessage;
        }
        
        alert(errorMessage);
        return errorMessage;
    }

    // Function to update current weather display
    function updateCurrentWeather(data) {
        if (weatherSection) {
            weatherSection.style.display = 'block';
        }
        
        document.getElementById('wind-speed').textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
        document.getElementById('temperature').textContent = `${data.main.temp.toFixed(1)} °C`;
        
        // Handle rain probability (OpenWeatherMap provides rain volume if it exists)
        const rainProb = data.rain ? (data.rain['1h'] || 0) * 10 : 0;
        document.getElementById('rain-probability').textContent = `${Math.min(100, rainProb)}%`;
        
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        
        // Estimate soil moisture based on recent rain and humidity
        const moisture = Math.min(100, Math.max(0, 
            data.main.humidity * 0.7 + 
            (data.rain ? (data.rain['1h'] || 0) * 3 : 0)
        )).toFixed(0);
        document.getElementById('moisture').textContent = `${moisture}%`;
        
        // Update weather icon in current weather
        const weatherIcon = document.getElementById('current-weather-icon');
        if (weatherIcon) {
            weatherIcon.textContent = getWeatherIcon(data.weather[0].id);
        }
        
        // Display location name
        const locationDisplay = document.getElementById('location-display');
        if (locationDisplay) {
            locationDisplay.textContent = `${data.name}, ${data.sys.country}`;
        }
    }

    // Function to process and display forecast data
    function displayForecast(forecastData) {
        const forecastContainer = document.getElementById('forecast');
        if (!forecastContainer) {
            console.error('Forecast container not found');
            return;
        }
        
        forecastContainer.innerHTML = '';
        
        // Group by day
        const dailyForecast = {};
        forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            if (!dailyForecast[day]) {
                dailyForecast[day] = {
                    temps: [],
                    weather: item.weather[0].main,
                    icon: getWeatherIcon(item.weather[0].id)
                };
            }
            dailyForecast[day].temps.push(item.main.temp);
        });
        
        // Display forecast for next 7 days
        const days = Object.keys(dailyForecast);
        const today = new Date().getDay();
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        // Ensure we only show future days (starting from tomorrow)
        let daysToShow = [];
        for (let i = 1; i <= 7; i++) {
            const dayIndex = (today + i) % 7;
            daysToShow.push(weekDays[dayIndex]);
        }
        
        // Filter and sort our forecast days
        const forecastDays = days.filter(day => daysToShow.includes(day))
                                .sort((a, b) => {
                                    return daysToShow.indexOf(a) - daysToShow.indexOf(b);
                                });
        
        // Create forecast elements
        forecastDays.forEach(dayName => {
            const dayForecast = dailyForecast[dayName];
            
            if (dayForecast) {
                const maxTemp = Math.max(...dayForecast.temps);
                const minTemp = Math.min(...dayForecast.temps);
                
                const forecastDay = document.createElement('div');
                forecastDay.className = 'forecast-day';
                forecastDay.innerHTML = `
                    <div class="day">${dayName}</div>
                    <div class="weather-icon">${dayForecast.icon}</div>
                    <div class="temp">
                        <span class="max-temp">${maxTemp.toFixed(0)}°</span>
                        <span class="min-temp">${minTemp.toFixed(0)}°</span>
                    </div>
                `;
                forecastContainer.appendChild(forecastDay);
            }
        });
    }

    // Function to fetch weather data - FIXED
    async function fetchWeatherData(city, state) {
        try {
            // Build query string - OpenWeatherMap expects comma-separated values
            const locationQuery = `${city},${state},IN`;
            console.log(`Fetching weather for: ${locationQuery}`);
            
            // Fetch current weather
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(locationQuery)}&units=metric&appid=${WEATHER_API_KEY}`);
            
            if (!weatherResponse.ok) {
                const errorData = await weatherResponse.json();
                throw new Error(`${weatherResponse.status}: ${errorData.message || 'Failed to fetch weather data'}`);
            }
            
            const weatherData = await weatherResponse.json();
            console.log('Weather data received:', weatherData);
            
            // Update current weather display
            updateCurrentWeather(weatherData);
            
            // Fetch forecast
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(locationQuery)}&units=metric&appid=${WEATHER_API_KEY}`);
            
            if (!forecastResponse.ok) {
                const errorData = await forecastResponse.json();
                throw new Error(`${forecastResponse.status}: ${errorData.message || 'Failed to fetch forecast data'}`);
            }
            
            const forecastData = await forecastResponse.json();
            console.log('Forecast data received:', forecastData);
            
            // Display forecast
            displayForecast(forecastData);
            
            return true;
        } catch (error) {
            handleWeatherError(error);
            return false;
        }
    }

    // Simple string similarity function (0 to 1)
    function stringSimilarity(str1, str2) {
        if (!str1 || !str2) return 0;
        
        str1 = str1.toLowerCase();
        str2 = str2.toLowerCase();
        
        if (str1.includes(str2)) return 0.8;
        if (str2.includes(str1)) return 0.8;
        
        const set1 = new Set(str1.split(''));
        const set2 = new Set(str2.split(''));
        const intersection = new Set([...set1].filter(x => set2.has(x)));
        
        return intersection.size / Math.max(set1.size, set2.size);
    }

    // Function to handle errors in geolocation safely
    function displayGeolocationError(error) {
        console.error('Geolocation error:', error);
        let message = 'Could not determine your location. Please select manually.';
        
        switch(error.code) {
            case error.PERMISSION_DENIED:
                message = 'Location access was denied. Please enable location services or select manually.';
                break;
            case error.POSITION_UNAVAILABLE:
                message = 'Location information is unavailable. Please select manually.';
                break;
            case error.TIMEOUT:
                message = 'Location request timed out. Please try again or select manually.';
                break;
        }
        
        alert(message);
        currentLocationBtn.innerHTML = '<span class="icon">📍</span> Use Current Location';
        currentLocationBtn.disabled = false;
    }

    // Function to handle geolocation - FIXED
    async function handleGeolocation() {
        if (navigator.geolocation) {
            currentLocationBtn.innerHTML = '<span class="icon">⏳</span> Detecting...';
            currentLocationBtn.disabled = true;
            
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    });
                });
                
                console.log('Geolocation successful:', position.coords);
                
                // Reverse geocoding to get location details
                const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${GEOLOCATION_API_KEY}`;
                console.log('Geocoding URL:', geocodeUrl);
                
                const response = await fetch(geocodeUrl);
                
                if (!response.ok) {
                    throw new Error(`Geocoding failed with status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Geocoding data:', data);
                
                if (data.results && data.results.length > 0) {
                    const components = data.results[0].components;
                    const state = components.state || components.state_district;
                    const district = components.county || components.state_district;
                    const city = components.city || components.town || components.village;
                    
                    console.log(`Detected location: ${city}, ${district}, ${state}`);
                    
                    // Find matching state in our dropdown
                    let foundState = false;
                    let stateValue = '';
                    
                    // First pass: try to find exact match or containing match
                    for (let i = 0; i < stateSelect.options.length; i++) {
                        const option = stateSelect.options[i];
                        const optionText = option.text.toLowerCase();
                        const stateText = state ? state.toLowerCase() : '';
                        
                        if (stateText && (optionText === stateText || stateText.includes(optionText) || optionText.includes(stateText))) {
                            stateSelect.value = option.value;
                            stateValue = option.value;
                            foundState = true;
                            console.log(`Found matching state: ${option.text}`);
                            break;
                        }
                    }
                    
                    // Second pass: try to find best match if exact match not found
                    if (!foundState && state) {
                        let bestMatch = null;
                        let bestScore = 0;
                        
                        for (let i = 0; i < stateSelect.options.length; i++) {
                            const option = stateSelect.options[i];
                            const score = stringSimilarity(state, option.text);
                            
                            if (score > bestScore && score > 0.3) {
                                bestScore = score;
                                bestMatch = option;
                            }
                        }
                        
                        if (bestMatch) {
                            stateSelect.value = bestMatch.value;
                            stateValue = bestMatch.value;
                            foundState = true;
                            console.log(`Found best matching state: ${bestMatch.text} (score: ${bestScore})`);
                        }
                    }
                    
                    if (foundState) {
                        // Trigger change event to populate districts
                        const event = new Event('change');
                        stateSelect.dispatchEvent(event);
                        
                        // Try to find district and city
                        setTimeout(() => {
                            if (districtSelect.options.length <= 1) {
                                console.warn('No districts loaded for state');
                                return;
                            }
                            
                            // Find best matching district
                            let bestDistrictMatch = null;
                            let bestScore = 0;
                            
                            for (let i = 1; i < districtSelect.options.length; i++) {
                                const option = districtSelect.options[i];
                                const score = stringSimilarity(district || '', option.text);
                                
                                if (score > bestScore) {
                                    bestScore = score;
                                    bestDistrictMatch = option;
                                }
                            }
                            
                            if (bestDistrictMatch && bestScore > 0.3) {
                                console.log(`Selected district: ${bestDistrictMatch.text} (score: ${bestScore})`);
                                districtSelect.value = bestDistrictMatch.value;
                                const districtEvent = new Event('change');
                                districtSelect.dispatchEvent(districtEvent);
                                
                                // Find best matching city
                                setTimeout(() => {
                                    if (citySelect.options.length <= 1) {
                                        console.warn('No cities loaded for district');
                                        return;
                                    }
                                    
                                    let bestCityMatch = null;
                                    let bestCityScore = 0;
                                    
                                    for (let i = 1; i < citySelect.options.length; i++) {
                                        const option = citySelect.options[i];
                                        const score = stringSimilarity(city || '', option.text);
                                        
                                        if (score > bestCityScore) {
                                            bestCityScore = score;
                                            bestCityMatch = option;
                                        }
                                    }
                                    
                                    if (bestCityMatch && bestCityScore > 0.3) {
                                        console.log(`Selected city: ${bestCityMatch.text} (score: ${bestCityScore})`);
                                        citySelect.value = bestCityMatch.value;
                                        showWeatherBtn.disabled = false;
                                        
                                        // Automatically fetch weather
                                        showWeatherBtn.click();
                                    } else {
                                        console.warn('No matching city found:', city);
                                        alert('Please select a city from the dropdown');
                                    }
                                }, 300);
                            } else {
                                console.warn('No matching district found:', district);
                                alert('Please select a district from the dropdown');
                            }
                        }, 300);
                    } else {
                        console.warn('No matching state found:', state);
                        alert('Could not determine your state. Please select manually.');
                    }
                } else {
                    console.error('No location data in geocoding response');
                    throw new Error('Location data not available');
                }
            } catch (error) {
                displayGeolocationError(error);
            } finally {
                currentLocationBtn.innerHTML = '<span class="icon">📍</span> Use Current Location';
                currentLocationBtn.disabled = false;
            }
        } else {
            alert('Geolocation is not supported by your browser');
        }
    }

    // Populate districts when state changes
    stateSelect.addEventListener('change', function() {
        if (this.value) {
            districtSelect.disabled = false;
            districtSelect.innerHTML = '<option value="">Select District</option>';
            
            if (locationData[this.value] && locationData[this.value].districts) {
                locationData[this.value].districts.forEach(district => {
                    const option = document.createElement('option');
                    option.value = district.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
            } else {
                console.error(`No districts found for state: ${this.value}`);
            }
            
            citySelect.disabled = true;
            citySelect.innerHTML = '<option value="">Select City</option>';
            showWeatherBtn.disabled = true;
        } else {
            districtSelect.disabled = true;
            citySelect.disabled = true;
            showWeatherBtn.disabled = true;
        }
    });
    
    // Populate cities when district changes
    districtSelect.addEventListener('change', function() {
        if (this.value && stateSelect.value) {
            citySelect.disabled = false;
            citySelect.innerHTML = '<option value="">Select City</option>';
            
            const districtName = this.options[this.selectedIndex].text;
            const state = stateSelect.value;
            
            if (locationData[state] && locationData[state].cities && locationData[state].cities[districtName]) {
                locationData[state].cities[districtName].forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.toLowerCase().replace(/\s+/g, '-');
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
            } else {
                // If no cities are found for this district, add a default city with the same name as district
                const option = document.createElement('option');
                option.value = districtName.toLowerCase().replace(/\s+/g, '-');
                option.textContent = districtName;
                citySelect.appendChild(option);
                console.warn(`No cities found for district: ${districtName}, using district name as city`);
            }
            
            showWeatherBtn.disabled = true;
        } else {
            citySelect.disabled = true;
            showWeatherBtn.disabled = true;
        }
    });
    
    // Enable weather button when city is selected
    citySelect.addEventListener('change', function() {
        showWeatherBtn.disabled = !this.value;
    });
    
    // Current location button - FIXED
    if (currentLocationBtn) {
        currentLocationBtn.addEventListener('click', handleGeolocation);
    } else {
        console.error('Current location button not found');
    }
    
    // Show weather button - FIXED
    if (showWeatherBtn) {
        showWeatherBtn.addEventListener('click', async function() {
            if (!citySelect.value || !stateSelect.value) {
                alert('Please select a location first');
                return;
            }
            
            const city = citySelect.options[citySelect.selectedIndex].text;
            const state = stateSelect.options[stateSelect.selectedIndex].text;
            
            const originalText = this.innerHTML;
            this.innerHTML = 'Loading...';
            this.disabled = true;
            
            console.log(`Fetching weather for ${city}, ${state}`);
            const success = await fetchWeatherData(city, state);
            
            this.innerHTML = originalText;
            this.disabled = !citySelect.value;
            
            if (success) {
                console.log('Weather data loaded successfully');
            }
        });
    } else {
        console.error('Show weather button not found');
    }
    
    // Debug check for crop tabs
    console.log('Tab Buttons:', tabButtons.length);
    console.log('Crop Categories:', cropCategories.length);
    
    // Ensure tab buttons have correct data-category attributes
    tabButtons.forEach(button => {
        const category = button.getAttribute('data-category');
        console.log(`Tab Button '${button.textContent}' links to category: ${category}`);
        const categoryElement = document.getElementById(category);
        if (!categoryElement) {
            console.error(`Category element with ID '${category}' not found`);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Farm Calculator Functionality
    const calculateBtn = document.getElementById('calculate-btn');
    const areaInput = document.getElementById('area');
    const cropResults = document.getElementById('crop-recommendation-results');
    const yieldResults = document.getElementById('yield-probability-results');
    
    calculateBtn.addEventListener('click', function() {
        const area = parseFloat(areaInput.value);
        
        if (isNaN(area) || area <= 0) {
            alert('Please enter a valid area in acres');
            return;
        }
        
        // Show loading states
        document.getElementById('crop-loading').style.display = 'flex';
        document.getElementById('yield-loading').style.display = 'flex';
        cropResults.innerHTML = '';
        yieldResults.innerHTML = '';
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Generate crop recommendations
            const crops = generateCropRecommendations(area);
            displayCropResults(crops);
            
            // Generate yield estimates
            const yields = generateYieldEstimates(area, crops);
            displayYieldResults(yields);
            
            // Hide loading states
            document.getElementById('crop-loading').style.display = 'none';
            document.getElementById('yield-loading').style.display = 'none';
        }, 1500);
    });
    
    function generateCropRecommendations(area) {
        // This would come from an API in a real application
        const allCrops = [
            { name: 'Wheat', suitability: 0.9, waterReq: 500, profitPerAcre: 15000 },
            { name: 'Rice', suitability: 0.8, waterReq: 1200, profitPerAcre: 20000 },
            { name: 'Corn', suitability: 0.7, waterReq: 600, profitPerAcre: 18000 },
            { name: 'Soybean', suitability: 0.6, waterReq: 450, profitPerAcre: 16000 },
            { name: 'Cotton', suitability: 0.5, waterReq: 700, profitPerAcre: 22000 }
        ];
        
        // Sort by suitability and return top 3
        return allCrops
            .sort((a, b) => b.suitability - a.suitability)
            .slice(0, 3)
            .map(crop => ({
                ...crop,
                estimatedProfit: Math.round(crop.profitPerAcre * area)
            }));
    }
    
    function displayCropResults(crops) {
        let html = '<div class="recommendation-list">';
        
        crops.forEach((crop, index) => {
            const suitabilityPercentage = Math.round(crop.suitability * 100);
            const suitabilityColor = 
                suitabilityPercentage >= 80 ? '#4CAF50' :
                suitabilityPercentage >= 60 ? '#FFC107' : '#F44336';
            
            html += `
                <div class="crop-item ${index === 0 ? 'top-recommendation' : ''}">
                    <div class="crop-header">
                        <h5>${crop.name}</h5>
                        <span class="suitability-badge" style="background: ${suitabilityColor}">
                            ${suitabilityPercentage}% match
                        </span>
                    </div>
                    <div class="crop-details">
                        <div class="detail">
                            <span class="label">Water Requirement:</span>
                            <span class="value">${crop.waterReq} mm/season</span>
                        </div>
                        <div class="detail">
                            <span class="label">Estimated Profit:</span>
                            <span class="value">₹${crop.estimatedProfit.toLocaleString()}</span>
                        </div>
                    </div>
                    ${index === 0 ? '<div class="best-choice">Best Choice</div>' : ''}
                </div>
            `;
        });
        
        html += '</div>';
        cropResults.innerHTML = html;
    }
    
    function generateYieldEstimates(area, crops) {
        // Simulate yield calculations based on crops and area
        return crops.map(crop => {
            const baseYield = {
                'Wheat': 2.5,
                'Rice': 3.0,
                'Corn': 2.8,
                'Soybean': 1.8,
                'Cotton': 1.2
            }[crop.name] || 2.0;
            
            const yieldPerAcre = baseYield * (0.8 + (crop.suitability * 0.4)); // Adjust based on suitability
            const totalYield = yieldPerAcre * area;
            
            return {
                crop: crop.name,
                yieldPerAcre: yieldPerAcre.toFixed(1),
                totalYield: totalYield.toFixed(1),
                unit: crop.name === 'Cotton' ? 'bales' : 'tons'
            };
        });
    }
    
    function displayYieldResults(yields) {
        let html = '<div class="yield-list">';
        
        yields.forEach(yieldData => {
            const yieldValue = parseFloat(yieldData.yieldPerAcre);
            const yieldLevel = 
                yieldValue >= 2.5 ? 'high' :
                yieldValue >= 1.5 ? 'medium' : 'low';
            
            html += `
                <div class="yield-item ${yieldLevel}-yield">
                    <div class="yield-header">
                        <h5>${yieldData.crop}</h5>
                        <span class="yield-badge">${yieldLevel} yield</span>
                    </div>
                    <div class="yield-details">
                        <div class="detail">
                            <span class="label">Per Acre:</span>
                            <span class="value">${yieldData.yieldPerAcre} ${yieldData.unit}</span>
                        </div>
                        <div class="detail">
                            <span class="label">Total (${areaInput.value} acres):</span>
                            <span class="value">${yieldData.totalYield} ${yieldData.unit}</span>
                        </div>
                    </div>
                    <div class="yield-meter">
                        <div class="meter-bar" style="width: ${Math.min(100, yieldValue * 40)}%"></div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        yieldResults.innerHTML = html;
    }
    
    // Market Analysis Tabs
    const marketTabs = document.querySelectorAll('.market-tab');
    marketTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            marketTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab content
            document.querySelectorAll('.market-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
            
            // Load data for this tab if not already loaded
            loadMarketData(tabId);
        });
    });
    
    // Load initial market data
    loadMarketData('selling');
    
    function loadMarketData(tab) {
        const insightsContainer = document.getElementById(`${tab}-insights`);
        
        // Skip if already loaded
        if (insightsContainer.innerHTML) return;
        
        // Show loading state
        insightsContainer.innerHTML = '<li>Loading data...</li>';
        
        // Simulate API call
        setTimeout(() => {
            const insights = {
                'selling': [
                    'High demand for wheat in northern markets',
                    'Rice prices expected to rise by 5-7% next month',
                    'Export opportunities for organic cotton'
                ],
                'buying': [
                    'Fertilizer prices stable this season',
                    'New hybrid seeds available at 10% discount',
                    'Tractor sales up 15% compared to last year'
                ],
                'prices': [] // Handled separately
            }[tab];
            
            if (tab === 'prices') {
                // Initialize price chart when tab is selected
                initPriceChart();
            } else {
                // Display insights
                insightsContainer.innerHTML = insights
                    .map(insight => `<li>${insight}</li>`)
                    .join('');
                
                // Simulate chart rendering
                renderMarketChart(tab);
            }
        }, 800);
    }
    
    function renderMarketChart(tab) {
        const chartContainer = document.getElementById(`${tab}-chart`);
        chartContainer.innerHTML = `
            <div class="chart-placeholder">
                <span class="icon">📊</span>
                <p>${tab.charAt(0).toUpperCase() + tab.slice(1)} trends visualization</p>
            </div>
        `;
    }
    
    function initPriceChart() {
        const chartContainer = document.getElementById('price-chart');
        chartContainer.innerHTML = `
            <div class="chart-placeholder">
                <span class="icon">💹</span>
                <p>Price history visualization</p>
            </div>
        `;
        
        // Add event listeners to price filters
        document.getElementById('crop-select').addEventListener('change', updatePriceChart);
        document.getElementById('duration-select').addEventListener('change', updatePriceChart);
    }
    
    function updatePriceChart() {
        const crop = document.getElementById('crop-select').value;
        const duration = document.getElementById('duration-select').value;
        
        if (!crop) return;
        
        // Simulate loading new chart data
        const chartContainer = document.getElementById('price-chart');
        chartContainer.innerHTML = `
            <div class="chart-loading">
                <div class="spinner"></div>
                <p>Loading ${crop} prices for last ${duration} days...</p>
            </div>
        `;
        
        setTimeout(() => {
            chartContainer.innerHTML = `
                <div class="chart-placeholder">
                    <span class="icon">💹</span>
                    <p>Displaying ${crop} prices for last ${duration} days</p>
                </div>
            `;
        }, 1200);
    }
    
    // Government Policies Tabs
    const policyTabs = document.querySelectorAll('.policy-tab');
    policyTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            policyTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab content
            document.querySelectorAll('.policy-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-policies`).classList.add('active');
            
            // Load data for this tab if not already loaded
            loadPolicyData(tabId);
        });
    });
    
    // Load initial policy data
    loadPolicyData('new');
    
    function loadPolicyData(type) {
        const container = document.getElementById(`${type}-policies-list`);
        
        // Skip if already loaded
        if (container.innerHTML) return;
        
        // Show loading state
        container.innerHTML = '<div class="loading-policies">Loading policies...</div>';
        
        // Simulate API call
        setTimeout(() => {
            const policies = {
                'new': [
                    {
                        title: 'PM Kisan Samman Nidhi Yojana (2023 Update)',
                        date: 'June 15, 2023',
                        description: 'Enhanced financial support of ₹8,000 per year to small and marginal farmers.',
                        link: '#'
                    },
                    {
                        title: 'Organic Farming Promotion Scheme',
                        date: 'May 1, 2023',
                        description: '50% subsidy on organic certification and 30% on organic inputs.',
                        link: '#'
                    }
                ],
                'old': [
                    {
                        title: 'Soil Health Card Scheme',
                        date: 'February 5, 2015',
                        description: 'Provides farmers with soil health cards every 3 years with crop-wise recommendations.',
                        link: '#'
                    },
                    {
                        title: 'Pradhan Mantri Fasal Bima Yojana',
                        date: 'January 13, 2016',
                        description: 'Crop insurance scheme with premium of just 2% for Kharif, 1.5% for Rabi crops.',
                        link: '#'
                    }
                ],
                'central': [
                    {
                        title: 'National Mission for Sustainable Agriculture',
                        date: 'Ongoing',
                        description: 'Promotes sustainable agriculture through climate change adaptation strategies.',
                        link: '#'
                    },
                    {
                        title: 'Micro Irrigation Fund',
                        date: 'Ongoing',
                        description: '₹5,000 crore fund to promote micro-irrigation for water use efficiency.',
                        link: '#'
                    }
                ]
            }[type];
            
            container.innerHTML = policies
                .map(policy => `
                    <div class="policy-card">
                        <div class="policy-card-header">
                            <h4>${policy.title}</h4>
                        </div>
                        <div class="policy-card-body">
                            <div class="policy-card-date">${policy.date}</div>
                            <div class="policy-card-desc">${policy.description}</div>
                            <a href="${policy.link}" class="policy-card-link">Read More →</a>
                        </div>
                    </div>
                `)
                .join('');
        }, 1000);
    }
    
    // Initialize calculator with sample data
    areaInput.value = '5';
});

document.addEventListener('DOMContentLoaded', function() {
    // Irrigation Data Calculation - Fixed Version
    const irrigationAreaInput = document.getElementById('irrigation-area');
    const irrigationSubmitBtn = document.querySelector('#irrigation-data button');
    const waterNeededDisplay = document.querySelector('#irrigation-data div:nth-of-type(2) p');
    
    // Water requirement constant (liters per sqm)
    const WATER_REQUIREMENT_PER_SQM = 5;
  
    // Calculate function
    function calculateWaterRequirement() {
      const area = parseFloat(irrigationAreaInput.value);
      
      if (isNaN(area) || area <= 0) {
        waterNeededDisplay.innerHTML = '<span style="color: red;">Please enter a valid positive number</span>';
        return;
      }
      
      const waterRequired = area * WATER_REQUIREMENT_PER_SQM;
      waterNeededDisplay.innerHTML = `
        <strong>Estimated water requirement:</strong> ${waterRequired.toFixed(2)} liters<br>
        <small>Calculation: ${area} sqm × ${WATER_REQUIREMENT_PER_SQM} liters/sqm</small>
      `;
      
      // Add visual feedback
      waterNeededDisplay.parentElement.style.backgroundColor = '#e8f5e9';
      setTimeout(() => {
        waterNeededDisplay.parentElement.style.backgroundColor = '';
      }, 1000);
    }
  
    // Event listeners
    irrigationSubmitBtn.addEventListener('click', calculateWaterRequirement);
    
    irrigationAreaInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        calculateWaterRequirement();
      }
    });
  });
    // Livestock Information Expansion
    const livestockSections = document.querySelectorAll('#livestock > div');
    
    livestockSections.forEach(section => {
      const heading = section.querySelector('h4');
      const content = section.querySelector('p');
      
      // Set default content based on heading
      if (!content.textContent.trim()) {
        content.textContent = getDefaultLivestockContent(heading.textContent);
      }
    });
    
    function getDefaultLivestockContent(title) {
      const contentMap = {
        'Care': 'Proper livestock care includes regular health checks, clean living conditions, and appropriate shelter. Ensure animals have access to clean water and are protected from extreme weather conditions.',
        'Medication': 'Regular vaccinations and deworming are essential. Always consult with a veterinarian for proper medication schedules and treatments specific to your livestock species.',
        'Quality Food': 'High-quality feed improves livestock health and productivity. The diet should be balanced with proteins, carbohydrates, vitamins, and minerals appropriate for the animal type and age.',
        'Business Cattle': 'For commercial purposes, consider breeds like Angus (beef), Holstein (dairy), or Brahman (heat-resistant). Market research is crucial to identify the most profitable options for your region.'
      };
      
      return contentMap[title] || 'Information not available.';
    }
    
    // Agricultural Tips Modal
    const tips = document.querySelectorAll('#agricultural-tips li');
    let modal = null;
    
    tips.forEach((tip, index) => {
      // Delay animation for each tip
      tip.style.animationDelay = `${index * 0.1}s`;
      
      // Add click event for more details
      tip.addEventListener('click', () => {
        showTipDetails(tip.textContent);
      });
    });
    
    function showTipDetails(tipTitle) {
      const detailMap = {
        'Tip 1: Best practices for crop rotation.': 'Rotate crops in a 3-4 year cycle. Follow heavy feeders with light feeders, then soil builders. For example: corn (heavy) → beans (light) → wheat (light) → clover (builder).',
        'Tip 2: Importance of soil health.': 'Healthy soil retains moisture, resists erosion, and provides nutrients. Test soil annually, maintain proper pH (6.0-7.0 for most crops), and add organic matter regularly.',
        'Tip 3: Efficient water management techniques.': 'Use drip irrigation for row crops, mulch to retain moisture, water early morning to reduce evaporation, and implement rainwater harvesting systems.',
        'Tip 4: Pest management strategies.': 'Practice integrated pest management: monitor regularly, use resistant varieties, encourage beneficial insects, and use pesticides only as last resort with proper timing.'
      };
      
      const detail = detailMap[tipTitle] || 'Additional details not available.';
      
      // Remove existing modal if any
      if (modal) {
        document.body.removeChild(modal);
      }
      
      // Create new modal
      modal = document.createElement('div');
      modal.id = 'tip-modal';
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
      modal.style.display = 'flex';
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';
      modal.style.zIndex = '1000';
      
      const modalContent = document.createElement('div');
      modalContent.style.backgroundColor = 'white';
      modalContent.style.padding = '30px';
      modalContent.style.borderRadius = '10px';
      modalContent.style.maxWidth = '600px';
      modalContent.style.width = '80%';
      modalContent.style.position = 'relative';
      
      const closeBtn = document.createElement('button');
      closeBtn.textContent = '✕';
      closeBtn.style.position = 'absolute';
      closeBtn.style.top = '10px';
      closeBtn.style.right = '10px';
      closeBtn.style.background = 'none';
      closeBtn.style.border = 'none';
      closeBtn.style.fontSize = '1.5rem';
      closeBtn.style.cursor = 'pointer';
      closeBtn.addEventListener('click', closeModal);
      
      modalContent.innerHTML = `
        <h3 style="color: #2e7d32; margin-bottom: 15px;">${tipTitle.split(':')[0]}</h3>
        <h4 style="color: #1b5e20; margin-bottom: 10px;">${tipTitle.split(':')[1].trim()}</h4>
        <p style="margin-top: 15px;">${detail}</p>
      `;
      
      modalContent.appendChild(closeBtn);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
      
      // Close modal when clicking outside content
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });
    }
    
    function closeModal() {
      if (modal) {
        document.body.removeChild(modal);
        modal = null;
      }
    }
    
    // Add some animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      @keyframes highlight {
        0% { background-color: #f1f8e9; }
        50% { background-color: #e8f5e9; }
        100% { background-color: #f1f8e9; }
      }
      
      #agricultural-tips li {
        animation: fadeIn 0.5s ease-out both;
        cursor: pointer;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
      }
      
      #tip-modal button {
        transition: all 0.2s ease;
      }
      
      #tip-modal button:hover {
        color: #d32f2f;
        transform: scale(1.1);
      }
    `;
    document.head.appendChild(style);
    document.addEventListener('DOMContentLoaded', function() {
        // New Farming Technologies - Interactive List
        const techItems = document.querySelectorAll('#new-farming-technologies li');
        
        // Technology details data
        const techDetails = {
          "Tech 1: Drones for crop monitoring.": {
            description: "Agricultural drones provide aerial views of fields to monitor crop health, irrigation needs, and pest problems. They can cover large areas quickly and provide precise data.",
            benefits: [
              "Early detection of crop stress",
              "Precision agriculture implementation",
              "Reduced manual scouting time",
              "Multispectral imaging capabilities"
            ],
            image: "🌐"
          },
          "Tech 2: Soil sensors for moisture detection.": {
            description: "Smart soil sensors measure moisture, temperature, and nutrient levels in real-time, allowing for optimized irrigation and fertilization schedules.",
            benefits: [
              "Water conservation",
              "Prevent over/under watering",
              "Real-time data access",
              "Improved crop yield"
            ],
            image: "💧"
          },
          "Tech 3: Automated irrigation systems.": {
            description: "Smart irrigation systems use weather data and soil conditions to automatically adjust watering schedules, ensuring optimal moisture levels with minimal waste.",
            benefits: [
              "Water savings up to 50%",
              "Remote control via smartphone",
              "Integration with weather forecasts",
              "Customizable zone watering"
            ],
            image: "⏲️"
          }
        };
      
        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'tech-modal';
        modal.innerHTML = `
          <div class="tech-modal-content">
            <span class="close-modal">&times;</span>
            <h3 class="tech-title"></h3>
            <div class="tech-image" style="font-size: 50px; text-align: center; margin: 15px 0;"></div>
            <p class="tech-description"></p>
            <h4>Key Benefits:</h4>
            <ul class="tech-benefits"></ul>
          </div>
        `;
        document.body.appendChild(modal);
      
        // Add click event to each technology item
        techItems.forEach(item => {
          item.addEventListener('click', function() {
            const techTitle = this.textContent.trim();
            const details = techDetails[techTitle];
            
            if (details) {
              document.querySelector('.tech-title').textContent = techTitle.split(':')[1].trim();
              document.querySelector('.tech-image').textContent = details.image;
              document.querySelector('.tech-description').textContent = details.description;
              
              const benefitsList = document.querySelector('.tech-benefits');
              benefitsList.innerHTML = '';
              details.benefits.forEach(benefit => {
                const li = document.createElement('li');
                li.textContent = benefit;
                benefitsList.appendChild(li);
              });
              
              modal.style.display = 'flex';
            }
          });
        });
      
        // Close modal when clicking X or outside
        document.querySelector('.close-modal').addEventListener('click', function() {
          modal.style.display = 'none';
        });
      
        modal.addEventListener('click', function(e) {
          if (e.target === modal) {
            modal.style.display = 'none';
          }
        });
      
        // User Profile - Simulated Data
        const userProfile = document.querySelector('#user-profile p');
        const userData = {
          name: "John Farmer",
          location: "California, USA",
          farmSize: "50 acres",
          specialty: "Organic vegetables",
          joined: "Member since 2020"
        };
        
        userProfile.innerHTML = `
          <div style="display: flex; align-items: center; margin-bottom: 15px;">
            <div style="width: 60px; height: 60px; background-color: #2196F3; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; font-size: 24px; margin-right: 15px;">${userData.name.charAt(0)}</div>
            <div>
              <h4 style="margin: 0; color: #333;">${userData.name}</h4>
              <p style="margin: 5px 0 0; color: #777;">${userData.specialty}</p>
            </div>
          </div>
          <ul style="list-style: none; padding: 0; margin-top: 15px;">
            <li style="margin-bottom: 8px; display: flex;">
              <span style="font-weight: bold; min-width: 100px;">Location:</span>
              <span>${userData.location}</span>
            </li>
            <li style="margin-bottom: 8px; display: flex;">
              <span style="font-weight: bold; min-width: 100px;">Farm Size:</span>
              <span>${userData.farmSize}</span>
            </li>
            <li style="display: flex;">
              <span style="font-weight: bold; min-width: 100px;">Member:</span>
              <span>${userData.joined}</span>
            </li>
          </ul>
        `;
      
        // Logout Functionality
        document.querySelector('#logout button').addEventListener('click', function() {
          // Create confirmation dialog
          const confirmDialog = document.createElement('div');
          confirmDialog.className = 'tech-modal';
          confirmDialog.style.display = 'flex';
          confirmDialog.innerHTML = `
            <div class="tech-modal-content" style="text-align: center; max-width: 400px;">
              <h3 style="color: #ff5e62;">Logout Confirmation</h3>
              <p>Are you sure you want to logout?</p>
              <div style="display: flex; justify-content: center; gap: 15px; margin-top: 20px;">
                <button id="confirm-logout" style="background: linear-gradient(135deg, #ff5e62 0%, #ff9966 100%); color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer;">Yes, Logout</button>
                <button id="cancel-logout" style="background: #f1f1f1; color: #333; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer;">Cancel</button>
              </div>
            </div>
          `;
          document.body.appendChild(confirmDialog);
      
          // Handle logout confirmation
          document.getElementById('confirm-logout').addEventListener('click', function() {
            alert('You have been logged out successfully!');
            // In a real app, you would redirect to login page:
            // window.location.href = '/login';
            confirmDialog.style.display = 'none';
          });
      
          // Handle cancel
          document.getElementById('cancel-logout').addEventListener('click', function() {
            confirmDialog.style.display = 'none';
          });
      
          // Close when clicking outside
          confirmDialog.addEventListener('click', function(e) {
            if (e.target === confirmDialog) {
              confirmDialog.style.display = 'none';
            }
          });
        });
      });

