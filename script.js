// script.js

// Initialize AOS (Animate On Scroll)
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  })
}

// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Navbar scroll effect
const navbar = document.getElementById("navbar")
let lastScrollTop = 0

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  lastScrollTop = scrollTop
})

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const offsetTop = section.offsetTop - 70 // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Back to top button
const backToTopButton = document.getElementById("backToTop")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("show")
  } else {
    backToTopButton.classList.remove("show")
  }
})

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Active navigation link highlighting
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

function highlightNavigation() {
  const scrollPosition = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

window.addEventListener("scroll", highlightNavigation)

// Modal functionality for gallery images
function openModal(modalId) {
  const modal = document.getElementById("imageModal")
  const modalBody = document.getElementById("modalBody")

  // Define modal content based on modalId
  const modalContent = {
    "login-modal": {
      title: "Màn hình Đăng nhập",
      description:
        "Giao diện đăng nhập bảo mật với xác thực người dùng. Hệ thống hỗ trợ đăng nhập bằng tài khoản và mật khẩu, có tính năng ghi nhớ đăng nhập và quên mật khẩu.",
      features: [
        "Xác thực người dùng an toàn",
        "Ghi nhớ thông tin đăng nhập",
        "Khôi phục mật khẩu",
        "Giao diện thân thiện",
      ],
    },
    "register-modal": {
      title: "Đăng ký Đội bóng",
      description:
        "Form đăng ký đội bóng với đầy đủ thông tin cần thiết. Hệ thống kiểm tra tính hợp lệ của dữ liệu và tự động tạo mã đội bóng.",
      features: ["Nhập thông tin đội bóng", "Tải lên logo đội bóng", "Chọn sân vận động", "Đăng ký tham gia giải đấu"],
    },
    "player-modal": {
      title: "Quản lý Cầu thủ",
      description:
        "Giao diện quản lý danh sách cầu thủ với các chức năng thêm, sửa, xóa và tìm kiếm. Hệ thống cho phép nhập thông tin chi tiết của từng cầu thủ.",
      features: [
        "Thêm cầu thủ mới",
        "Chỉnh sửa thông tin cầu thủ",
        "Tìm kiếm và lọc cầu thủ",
        "Quản lý vị trí thi đấu",
      ],
    },
    "schedule-modal": {
      title: "Lịch Thi đấu",
      description:
        "Hiển thị lịch thi đấu chi tiết với thông tin về thời gian, địa điểm và các đội tham gia. Hệ thống tự động cập nhật kết quả và thông báo.",
      features: [
        "Xem lịch thi đấu theo ngày",
        "Thông tin chi tiết trận đấu",
        "Cập nhật kết quả trực tiếp",
        "Thông báo lịch thi đấu",
      ],
    },
    "ranking-modal": {
      title: "Bảng Xếp hạng",
      description:
        "Bảng xếp hạng tự động cập nhật dựa trên kết quả các trận đấu. Hiển thị điểm số, thành tích và thống kê chi tiết của từng đội.",
      features: ["Xếp hạng tự động", "Thống kê chi tiết", "Lịch sử thành tích", "So sánh đội bóng"],
    },
    "report-modal": {
      title: "Báo cáo & Thống kê",
      description:
        "Tạo các báo cáo chi tiết và biểu đồ thống kê về giải đấu, đội bóng và cầu thủ. Hỗ trợ xuất file PDF và Excel.",
      features: ["Báo cáo tổng quan giải đấu", "Thống kê cầu thủ xuất sắc", "Biểu đồ phân tích", "Xuất file báo cáo"],
    },
  }

  const content = modalContent[modalId]
  if (content) {
    modalBody.innerHTML = `
            <h2 style="margin-bottom: 1rem; color: #1f2937;">${content.title}</h2>
            <p style="margin-bottom: 1.5rem; color: #6b7280; line-height: 1.6;">${content.description}</p>
            <h3 style="margin-bottom: 1rem; color: #1f2937;">Tính năng chính:</h3>
            <ul style="list-style: none; padding: 0;">
                ${content.features
                  .map(
                    (feature) => `
                    <li style="padding: 0.5rem 0; color: #374151; position: relative; padding-left: 1.5rem;">
                        <span style="position: absolute; left: 0; color: #991f18; font-weight: bold;">✓</span>
                        ${feature}
                    </li>
                `,
                  )
                  .join("")}
            </ul>
        `
    modal.style.display = "block"
  }
}

// Expose the openModal function to the global scope
window.openModal = openModal

function closeModal() {
  const modal = document.getElementById("imageModal")
  modal.style.display = "none"
}

// Expose the closeModal function to the global scope
window.closeModal = closeModal

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  const modal = document.getElementById("imageModal")
  if (event.target === modal) {
    closeModal()
  }
})

// Gallery filtering
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".gallery-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      document.querySelectorAll(".gallery-tab").forEach((t) => t.classList.remove("active"))

      // Add active class to clicked tab
      tab.classList.add("active")

      const category = tab.getAttribute("data-tab")

      // Filter gallery items
      document.querySelectorAll(".gallery-item").forEach((item) => {
        if (category === "all" || item.getAttribute("data-category") === category) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Video play button
  const playButton = document.querySelector(".play-button")
  if (playButton) {
    playButton.addEventListener("click", () => {
      alert("Video demo would play here in a real implementation")
    })
  }
})

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.innerHTML
    typeWriter(heroTitle, originalText, 50)
  }
})

// Counter animation for statistics
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        counter.textContent = target + "+"
        clearInterval(timer)
      } else {
        counter.textContent = Math.floor(current) + "+"
      }
    }, 20)
  })
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector(".stats-section")
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        observer.unobserve(entry.target)
      }
    })
  })

  observer.observe(statsSection)
}

// Progress bar animation
function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-fill")

  progressBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress")
    if (progress) {
      bar.style.width = progress + "%"
    }
  })

  const metricBars = document.querySelectorAll(".metric-fill")
  metricBars.forEach((bar) => {
    const width = bar.style.width
    bar.style.width = "0%"
    setTimeout(() => {
      bar.style.width = width
    }, 500)
  })
}

// Trigger progress bar animation when section is visible
const progressSection = document.querySelector(".progress")
if (progressSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateProgressBars()
        observer.unobserve(entry.target)
      }
    })
  })

  observer.observe(progressSection)
}

// Tab functionality for progress section
function showTab(tabName) {
  // Hide all tab contents
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active")
  })

  // Remove active class from all tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Show selected tab content
  document.getElementById(tabName).classList.add("active")

  // Add active class to clicked button
  event.target.classList.add("active")
}

// Tab functionality for meetings section
function showMeetingTab(tabName) {
  // Hide all meeting contents
  document.querySelectorAll(".meeting-content").forEach((content) => {
    content.classList.remove("active")
  })

  // Remove active class from all tab buttons
  document.querySelectorAll(".meetings-tabs .tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Show selected tab content
  document.getElementById(tabName).classList.add("active")

  // Add active class to clicked button
  event.target.classList.add("active")
}

// Parallax effect for hero background shapes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const shapes = document.querySelectorAll(".bg-shape")

  shapes.forEach((shape, index) => {
    const speed = 0.5 + index * 0.1
    shape.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Animate football icons
function animateFootballIcons() {
  const footballIcons = document.querySelectorAll(".football-icon")

  footballIcons.forEach((icon, index) => {
    const randomX = Math.random() * 10 - 5
    const randomY = Math.random() * 10 - 5

    icon.style.transform = `translate(${randomX}px, ${randomY}px)`

    setTimeout(() => {
      icon.style.transform = "translate(0, 0)"
    }, 500)
  })
}

// Lazy loading for images
const images = document.querySelectorAll("img[data-src]")
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.classList.remove("lazy")
      observer.unobserve(img)
    }
  })
})

images.forEach((img) => imageObserver.observe(img))

// Smooth reveal animation for elements
function revealElements() {
  const elements = document.querySelectorAll(".fade-in")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible")
    }
  })
}

window.addEventListener("scroll", revealElements)

// Initialize reveal animation
document.addEventListener("DOMContentLoaded", revealElements)

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    highlightNavigation()
    revealElements()
  }, 100),
)

// Download functionality
document.querySelectorAll(".download-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    // Simulate download
    const fileName = this.closest(".document-item")?.querySelector("span")?.textContent || "document"
    alert(`Đang tải xuống: ${fileName}`)
  })
})

// Demo video play functionality
document.querySelectorAll(".play-overlay").forEach((overlay) => {
  overlay.addEventListener("click", () => {
    const demoVideo = document.getElementById('mainDemoVideo');
    if (demoVideo) {
      demoVideo.play();
      overlay.style.display = 'none'; // Hide overlay when video plays
    }
    // Optional: Show overlay again if video is paused and at start
    demoVideo.addEventListener('pause', function() {
        if (demoVideo.currentTime === 0 || demoVideo.ended) {
            overlay.style.display = '';
        }
    });
  })
})


// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Website loaded successfully!")
  console.log("⚽ Football Tournament Management System Showcase")

  // Add fade-in class to elements for animation
  const animatedElements = document.querySelectorAll(".feature-card, .team-member, .timeline-item, .deliverable-card")
  animatedElements.forEach((element) => {
    element.classList.add("fade-in")
  })
})

// Easter egg: Konami code
const konamiCode = []
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.keyCode)

  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift()
  }

  if (konamiCode.toString() === konamiSequence.toString()) {
    // Easter egg activated - football animation
    createFootballAnimation()
  }
})

// Football animation for easter egg
function createFootballAnimation() {
  const container = document.createElement("div")
  container.style.position = "fixed"
  container.style.top = "0"
  container.style.left = "0"
  container.style.width = "100%"
  container.style.height = "100%"
  container.style.pointerEvents = "none"
  container.style.zIndex = "9999"
  document.body.appendChild(container)

  for (let i = 0; i < 20; i++) {
    const ball = document.createElement("i")
    ball.className = "fas fa-futbol"
    ball.style.position = "absolute"
    ball.style.left = Math.random() * 100 + "%"
    ball.style.top = "-50px"
    ball.style.fontSize = Math.random() * 20 + 10 + "px"
    ball.style.color = "#1a472a"
    ball.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards, spin ${Math.random() * 3 + 2}s linear infinite`
    container.appendChild(ball)
  }

  setTimeout(() => {
    container.remove()
  }, 5000)

  // Add animation keyframes
  const style = document.createElement("style")
  style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(100vh);
            }
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `
  document.head.appendChild(style)
}

// Add click handlers for external links
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (this.textContent.includes("GitHub")) {
      e.preventDefault()
      window.open("https://github.com", "_blank")
    } else if (this.textContent.includes("Figma")) {
      e.preventDefault()
      window.open("https://figma.com", "_blank")
    }
  })
})

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all animated elements
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".feature-card, .team-member, .timeline-item, .deliverable-card, .stat-item",
  )

  animatedElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = `all 0.6s ease ${index * 0.1}s`
    observer.observe(el)
  })
})

// Feature tabs functionality
function showFeatureTab(tabName) {
  // Hide all feature contents
  document.querySelectorAll(".feature-content").forEach((content) => {
    content.classList.remove("active")
  })

  // Remove active class from all feature tab buttons
  document.querySelectorAll(".feature-tab").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Show selected feature content
  document.getElementById(tabName).classList.add("active")

  // Add active class to clicked button
  event.target.classList.add("active")

  // Scroll to the top of the feature content
  const featureContent = document.getElementById(tabName)
  const headerOffset = 100
  const elementPosition = featureContent.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  })
}

/**
 * Simple slideshow for each feature tab.
 * Each .feature-content has .feature-slides > .feature-slide
 */
const featureSlideshows = {}

function plusFeatureSlide(tabId, n) {
  if (!featureSlideshows[tabId]) {
    featureSlideshows[tabId] = 0
  }
  const tab = document.getElementById(tabId)
  if (!tab) return
  const slides = tab.querySelectorAll(".feature-slide")
  let idx = featureSlideshows[tabId]
  slides[idx].classList.remove("active")
  idx = (idx + n + slides.length) % slides.length
  slides[idx].classList.add("active")
  featureSlideshows[tabId] = idx
}

// Reset slideshow index when tab is shown
function showFeatureTab(tabId) {
  document.querySelectorAll(".feature-tab").forEach((btn) => btn.classList.remove("active"))
  document.querySelectorAll(".feature-content").forEach((tab) => tab.classList.remove("active"))
  document.querySelector(`.feature-tab[onclick*="${tabId}"]`).classList.add("active")
  document.getElementById(tabId).classList.add("active")
  // Reset slideshow to first slide
  const slides = document.getElementById(tabId).querySelectorAll(".feature-slide")
  if (slides.length) {
    slides.forEach((s, i) => s.classList.toggle("active", i === 0))
    featureSlideshows[tabId] = 0
  }
}

// Xử lý tải file cho các nút download-btn (nếu có data-file)
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".download-btn[data-file]").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const file = btn.getAttribute("data-file")
      if (file) {
        const a = document.createElement("a")
        a.href = file
        a.download = ""
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    })
  })
})
