const mongoose = require('mongoose');
const SysInfo = require('../database/models/sysInfoModel.js');
require('dotenv').config();

async function initSysInfo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await SysInfo.findOne({});
    if (existing) {
      console.log('sysInfo already exists');
    } else {
      await SysInfo.create({
        AiEngineVer: '1.0.0',
        topTen: []
      });
      console.log('sysInfo created successfully');
    }
  } catch (error) {
    console.error('Error initializing sysInfo:', error);
  } finally {
    await mongoose.disconnect();
  }
}

initSysInfo();