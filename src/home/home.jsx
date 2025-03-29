import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <motion.h1 
        className="display-4 fw-bold mb-4 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        การ์ด YU-GI-OH! แปลไทยโดย AI
      </motion.h1>
      
      <motion.div 
        className="card shadow-lg p-4 rounded-3 bg-light"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ maxWidth: "600px" }}
      >
        <div className="card-body">
          <p className="lead text-secondary">
            เว็บไซต์ของเรามีระบบแปลการ์ด YU-GI-OH! อัตโนมัติด้วย ช่วยให้คุณสามารถอ่านคำอธิบายการ์ดเป็นภาษาไทยได้สะดวกสบายมากยิ่งขึ้น 
            พร้อมอัปเดตการ์ดใหม่ ๆ อย่างต่อเนื่อง!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
