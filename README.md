# 🕉️ ஸ்ரீ பழனி முருகன் விழா அரங்கம் — Website & Backend
### Sri Palani Murugan Vizha Arangam, Vallavari, Thanjavur – 614801

Full-stack Function Hall Booking System built with **HTML5, CSS3, JavaScript, Node.js, Express, and MongoDB**.

---

## 🚀 Quick Start (எப்படி இயக்குவது)

### 1. Dependencies நிறுவுதல்:
```bash
npm install
```

### 2. Server இயக்குதல்:
```bash
npm start
```
அல்லது:
```bash
node server.js
```

### 3. இணையதளத்தை திறக்க:
- **வாடிக்கையாளர் தளம் (Customer Website):** [http://localhost:3000](http://localhost:3000)
- **நிர்வாகி பலகை (Admin Dashboard):** [http://localhost:3000/admin.html](http://localhost:3000/admin.html)

---

## 🗄️ இலவச ஆன்லைன் டேட்டாபேஸ் அமைப்பது எப்படி (Free Online MongoDB Atlas)

இந்த இணையதளத்திற்கு **MongoDB Atlas M0 Free Cluster** (100% இலவசம் - Credit Card தேவையில்லை) பயன்படுத்தலாம்:

1. **MongoDB Atlas-ல் கணக்கு தொடங்கவும்:**
   - [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) சென்று இலவசமாக Sign Up செய்யுங்கள்.
2. **இலவச M0 Cluster தேர்வு செய்யவும்:**
   - **Shared M0 Cluster (Free Forever - 512MB)** தேர்வு செய்து "Create" கொடுங்கள்.
3. **Database User & IP சேர்க்கவும்:**
   - Database Access -> பயனர் பெயர் & கடவுச்சொல் உருவாக்கவும்.
   - Network Access -> `0.0.0.0/0` (Allow Access from Anywhere) சேர்க்கவும்.
4. **Connection String பெறவும்:**
   - "Connect" -> "Drivers (Node.js)" கிளிக் செய்து URL-ஐ நகலெடுக்கவும்:
   ```text
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/palani_murugan_hall?retryWrites=true&w=majority
   ```
5. **`.env` கோப்பில் சேர்க்கவும்:**
   `.env` கோப்பை திறந்து உங்கள் URL-ஐ மாற்றவும்:
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://raj:password123@cluster0.xxxxx.mongodb.net/palani_murugan_hall?retryWrites=true&w=majority
   ```

> 💡 **Auto-Fallback வசதி:** ஆன்லைன் MongoDB இணைக்கப்படாத போதும், சர்வர் தானாகவே `bookings_backup.json` மூலம் தடையின்றி இயங்கும்!

---

## 📋 முக்கிய வசதிகள் (Key Features)

1. **Double Booking Prevention (ஏற்கனவே பதிவு செய்த தேதி தடுப்பு):**
   - ஒரு தேதி பதிவு செய்யப்பட்டிருந்தால், உடனடியாக **"❌ இந்த தேதி ஏற்கனவே முன்பதிவு செய்யப்பட்டுள்ளது"** என்று சிவப்பில் காட்டும்.
2. **30 Days Limit (30 நாட்கள் வரம்பு):**
   - இன்று முதல் அடுத்த 30 நாட்களுக்குள் மட்டுமே முன்பதிவு செய்ய அனுமதிக்கப்படும்.
3. **Real Dynamic UPI QR Code:**
   - GPay, PhonePe, Paytm, BHIM செயலிகளுக்கான நேரடி லிங்க் மற்றும் ஸ்கேனர் வசதி.
   - UPI ID: `rajm19407-1@oksbi`
4. **WhatsApp Instant Manager Alert:**
   - முன்பதிவு உறுதியானதும் உடனடியாக **+91 9655609405** வாட்ஸ்அப்பிற்கு முழு விவரமும் அனுப்பப்படும்.
5. **நிர்வாகி தளம் (Admin Dashboard):**
   - `admin.html` வழியாக அனைத்து முன்பதிவுகளையும் பார்க்கலாம், ரத்து செய்யலாம், தேடலாம்.
