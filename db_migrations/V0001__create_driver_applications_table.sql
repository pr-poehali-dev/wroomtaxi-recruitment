CREATE TABLE IF NOT EXISTS driver_applications (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    has_own_car BOOLEAN NOT NULL,
    document_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'new'
);

CREATE INDEX idx_created_at ON driver_applications(created_at DESC);
CREATE INDEX idx_status ON driver_applications(status);