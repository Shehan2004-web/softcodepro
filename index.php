<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Mission Section</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        .mission-section {
            background: linear-gradient(135deg, #4c3c8a 0%, #5a4a9b 100%);
            padding: 80px 0;
            position: relative;
            overflow: hidden;
        }

        .mission-section::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 300px;
            height: 100%;
            background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%);
            transform: skewX(-15deg);
        }

        .section-title {
            color: #ffd700;
            font-size: 3rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 1rem;
        }

        .section-subtitle {
            color: #ffffff;
            font-size: 1.5rem;
            font-weight: 300;
            margin-bottom: 1rem;
        }

        .section-description {
            color: rgba(255,255,255,0.9);
            font-size: 1.1rem;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto 4rem;
        }

        .logo-container {
            position: absolute;
            top: 30px;
            right: 30px;
        }

        .logo {
            background: #ffffff;
            width: 60px;
            height: 60px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .logo i {
            color: #4c3c8a;
            font-size: 24px;
        }

        .mission-cards {
            display: flex;
            gap: 2rem;
            flex-wrap: wrap;
            justify-content: center;
        }

        .mission-card {
            background: #ffffff;
            border-radius: 20px;
            padding: 2rem;
            width: 280px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .mission-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: var(--card-color);
        }

        .mission-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .card-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            background: var(--card-color);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .card-icon i {
            font-size: 2rem;
            color: #ffffff;
        }

        .card-title {
            font-size: 1.3rem;
            font-weight: 700;
            color: #333;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 1rem;
        }

        .card-description {
            color: #666;
            font-size: 0.95rem;
            line-height: 1.6;
        }

        /* Card specific colors */
        .mission-card.mission {
            --card-color: #ff8a50;
        }

        .mission-card.vision {
            --card-color: #e74c3c;
        }

        .mission-card.values {
            --card-color: #5a4a9b;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .mission-section {
                padding: 60px 0;
            }

            .section-title {
                font-size: 2.5rem;
            }

            .section-subtitle {
                font-size: 1.3rem;
            }

            .mission-cards {
                flex-direction: column;
                align-items: center;
            }

            .mission-card {
                width: 100%;
                max-width: 350px;
            }

            .logo-container {
                position: static;
                text-align: center;
                margin-bottom: 2rem;
            }
        }

        @media (max-width: 576px) {
            .section-title {
                font-size: 2rem;
            }

            .mission-card {
                padding: 1.5rem;
            }
        }

        /* Animation */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate-card {
            animation: fadeInUp 0.6s ease forwards;
        }

        .animate-card:nth-child(1) { animation-delay: 0.1s; }
        .animate-card:nth-child(2) { animation-delay: 0.2s; }
        .animate-card:nth-child(3) { animation-delay: 0.3s; }
    </style>
</head>
<body>
    <section class="mission-section">
        <div class="container">
            <!-- Logo -->
            <div class="logo-container d-none d-md-block">
                <div class="logo">
                    <i class="fas fa-cube"></i>
                </div>
            </div>

            <!-- Section Header -->
            <div class="text-center mb-5">
                <h1 class="section-title">Our Mission</h1>
                <p class="section-subtitle">Building Tomorrow's Solutions Today</p>
                <p class="section-description">
                    We are dedicated to delivering innovative solutions that transform businesses and create lasting value. Our commitment to excellence drives us to push boundaries and exceed expectations in everything we do.
                </p>
            </div>

            <!-- Mission Cards -->
            <div class="mission-cards">
                <!-- Mission Card -->
                <div class="mission-card mission animate-card">
                    <div class="card-icon">
                        <i class="fas fa-bullseye"></i>
                    </div>
                    <h3 class="card-title">Mission</h3>
                    <p class="card-description">
                        To empower businesses through cutting-edge technology solutions that drive growth, efficiency, and innovation in an ever-evolving digital landscape.
                    </p>
                </div>

                <!-- Vision Card -->
                <div class="mission-card vision animate-card">
                    <div class="card-icon">
                        <i class="fas fa-eye"></i>
                    </div>
                    <h3 class="card-title">Vision</h3>
                    <p class="card-description">
                        To be the leading catalyst for digital transformation, creating a future where technology seamlessly integrates with human potential.
                    </p>
                </div>

                <!-- Values Card -->
                <div class="mission-card values animate-card">
                    <div class="card-icon">
                        <i class="fas fa-star"></i>
                    </div>
                    <h3 class="card-title">Values</h3>
                    <p class="card-description">
                        Innovation, integrity, collaboration, and excellence form the foundation of our approach. We believe in sustainable solutions that benefit all stakeholders.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script>
        // Add scroll animation
        window.addEventListener('scroll', function() {
            const cards = document.querySelectorAll('.mission-card');
            const triggerBottom = window.innerHeight / 5 * 4;

            cards.forEach(card => {
                const cardTop = card.getBoundingClientRect().top;
                if(cardTop < triggerBottom) {
                    card.classList.add('animate-card');
                }
            });
        });

        // Add hover effect sound (optional)
        document.querySelectorAll('.mission-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    </script>
</body>
</html>