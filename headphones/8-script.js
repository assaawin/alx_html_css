// 8-script.js

document.addEventListener("DOMContentLoaded", function () {
  // Create hamburger menu elements
  const headerContainer = document.querySelector(".header-container");
  const navMenu = document.querySelector(".nav-menu");

  // Create hamburger button
  const hamburgerBtn = document.createElement("button");
  hamburgerBtn.className = "hamburger-btn";
  hamburgerBtn.setAttribute("aria-label", "Toggle navigation menu");
  hamburgerBtn.innerHTML = `
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
    `;

  // Insert hamburger button before the nav menu
  headerContainer.insertBefore(hamburgerBtn, navMenu);

  // Add mobile menu styles dynamically
  const style = document.createElement("style");
  style.textContent = `
        /* Hamburger Menu Styles */
        .hamburger-btn {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
            z-index: 1001;
            position: relative;
        }
        
        .hamburger-line {
            display: block;
            width: 25px;
            height: 3px;
            background-color: var(--text-color);
            margin: 4px 0;
            border-radius: 2px;
            transition: all 0.3s ease;
        }
        
        /* Mobile Navigation Styles */
        @media (max-width: 480px) {
            .hamburger-btn {
                display: block;
            }
            
            .nav-menu {
                position: fixed;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100vh;
                background-color: var(--dark-color);
                display: flex;
                justify-content: center;
                align-items: center;
                transition: left 0.5s ease;
                z-index: 1000;
                opacity: 0.98;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu ul {
                flex-direction: column;
                align-items: center;
                gap: 40px;
            }
            
            .nav-menu a {
                font-size: 18px;
                color: var(--text-color);
                opacity: 0.9;
                transition: all 0.3s ease;
            }
            
            .nav-menu a:hover {
                color: var(--primary-color);
                opacity: 1;
                transform: translateX(10px);
            }
            
            /* Hamburger Animation */
            .hamburger-btn.active .hamburger-line:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
                background-color: var(--primary-color);
            }
            
            .hamburger-btn.active .hamburger-line:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger-btn.active .hamburger-line:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
                background-color: var(--primary-color);
            }
            
            /* Prevent body scroll when menu is open */
            body.menu-open {
                overflow: hidden;
            }
        }
    `;

  document.head.appendChild(style);

  // Toggle menu function
  function toggleMenu() {
    const isActive = navMenu.classList.contains("active");

    if (isActive) {
      // Close menu
      navMenu.classList.remove("active");
      hamburgerBtn.classList.remove("active");
      document.body.classList.remove("menu-open");
      hamburgerBtn.setAttribute("aria-expanded", "false");
    } else {
      // Open menu
      navMenu.classList.add("active");
      hamburgerBtn.classList.add("active");
      document.body.classList.add("menu-open");
      hamburgerBtn.setAttribute("aria-expanded", "true");
    }
  }

  // Add click event to hamburger button
  hamburgerBtn.addEventListener("click", toggleMenu);

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 480) {
        toggleMenu();
      }
    });
  });

  // Close menu when pressing Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navMenu.classList.contains("active")) {
      toggleMenu();
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      window.innerWidth <= 480 &&
      navMenu.classList.contains("active") &&
      !navMenu.contains(event.target) &&
      !hamburgerBtn.contains(event.target)
    ) {
      toggleMenu();
    }
  });

  // Handle window resize
  function handleResize() {
    if (window.innerWidth > 480) {
      // Reset menu state on larger screens
      navMenu.classList.remove("active");
      hamburgerBtn.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  }

  window.addEventListener("resize", handleResize);
});
