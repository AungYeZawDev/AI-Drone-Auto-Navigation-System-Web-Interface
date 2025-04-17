document.addEventListener('DOMContentLoaded', function () {
    // Change active navigation link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
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

    // Wind Scenario Selector Logic
    const windScenarioSelect = document.getElementById('windScenarioSelect');
    const windDescription = document.getElementById('windDescription');
    const windScenarioImg = document.getElementById('windScenarioImg');

    if (windScenarioSelect) {
        windScenarioSelect.addEventListener('change', function () {
            updateWindScenario(this.value);
        });
    }

    function updateWindScenario(scenario) {
        // Update the wind scenario description
        let description = '';
        switch (scenario) {
            case 'calm':
                description = 'Almost no wind, ideal flying conditions. The drone maintains stable flight with minimal corrections required.';
                break;
            case 'light':
                description = 'Light breeze with minimal impact on flight. The drone requires subtle adjustments to maintain position.';
                break;
            case 'moderate':
                description = 'Moderate wind requiring active compensation from the PID controller. This scenario demonstrates the effectiveness of wind compensation algorithms in maintaining flight stability.';
                break;
            case 'strong':
                description = 'Strong wind creating significant drift. The controller must apply substantial corrections to maintain course.';
                break;
            case 'stormy':
                description = 'Storm conditions with extreme turbulence. Tests the limits of the controller`s ability to maintain stable flight.';
                break;
            case 'gusty':
                description = 'Unpredictable gusts testing rapid adaptation. The controller must respond quickly to sudden changes in wind forces.';
                break;
        }

        // Update description
        if (windDescription) {
            windDescription.innerHTML = `<p>${description}</p>`;
        }

        // Update image (assuming you have corresponding images)
        if (windScenarioImg) {
            windScenarioImg.src = `assets/plots/drone_plot_${scenario}.png`;
            windScenarioImg.alt = `${scenario.charAt(0).toUpperCase() + scenario.slice(1)} Wind Scenario`;
        }
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, section');

        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            // If element is in viewport
            if (position.top <= window.innerHeight && position.bottom >= 0) {
                element.classList.add('show');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
});