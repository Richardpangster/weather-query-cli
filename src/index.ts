#!/usr/bin/env node

import https from 'https';
import { IncomingMessage } from 'http';

const VERSION = '1.1.0';

interface WeatherDay {
  date: string;
  condition: string;
  maxTemp: string;
  minTemp: string;
  humidity: string;
}

function showHelp(): void {
  console.log(`
Weather Query CLI v${VERSION}

Usage:
  weather-query <city>              Query today weather
  weather-query <city> --forecast   Query future weather (default 3 days)
  weather-query <city> -f           Short for --forecast
  weather-query <city> --days 5     Query specific days
  weather-query --help              Show this help
  weather-query --version           Show version

Examples:
  weather-query Beijing
  weather-query 上海 --forecast
  weather-query Tokyo -f --days 5
`);
}

function showVersion(): void {
  console.log(VERSION);
}

function fetchWeatherJSON(city: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const encodedCity = encodeURIComponent(city);
    const url = `https://wttr.in/${encodedCity}?format=j1`;
    
    const req = https.get(url, { 
      headers: { 'User-Agent': 'curl/7.68.0' },
      timeout: 10000
    }, (res: IncomingMessage) => {
      let data = '';
      res.on('data', (chunk: Buffer) => data += chunk.toString());
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Invalid JSON response'));
        }
      });
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

function parseWeatherData(data: any, days: number): WeatherDay[] {
  const result: WeatherDay[] = [];
  const weatherDays = data.weather?.slice(0, days) || [];
  
  for (const day of weatherDays) {
    const date = day.date;
    const condition = day.hourly?.[4]?.weatherDesc?.[0]?.value || 'Unknown';
    const maxTemp = day.maxtempC + '°C';
    const minTemp = day.mintempC + '°C';
    const humidity = (day.hourly?.[4]?.humidity || 'N/A') + '%';
    
    result.push({ date, condition, maxTemp, minTemp, humidity });
  }
  
  return result;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const isToday = date.toDateString() === today.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();
  
  let label = '';
  if (isToday) label = '今天';
  else if (isTomorrow) label = '明天';
  else {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    label = weekdays[date.getDay()];
  }
  
  return `${label} (${dateStr.slice(5)})`;
}

function showCurrentWeather(city: string, data: any): void {
  const current = data.current_condition?.[0];
  if (!current) {
    console.log('无法获取当前天气数据');
    return;
  }
  
  console.log(`\n城市: ${city}`);
  console.log(`天气: ${current.weatherDesc?.[0]?.value || 'Unknown'}`);
  console.log(`温度: ${current.temp_C}°C`);
  console.log(`湿度: ${current.humidity}%`);
  console.log();
}

function showForecast(city: string, days: WeatherDay[]): void {
  console.log(`\n城市: ${city}\n`);
  
  for (const day of days) {
    console.log(`${formatDate(day.date)}`);
    console.log(`  天气: ${day.condition}`);
    console.log(`  温度: ${day.minTemp} ~ ${day.maxTemp}`);
    console.log(`  湿度: ${day.humidity}`);
    console.log();
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help') {
    showHelp();
    process.exit(0);
  }
  
  if (args[0] === '--version') {
    showVersion();
    process.exit(0);
  }
  
  const city = args[0];
  const forecastIndex = args.findIndex(arg => arg === '--forecast' || arg === '-f');
  const hasForecast = forecastIndex !== -1;
  
  let days = 3;
  const daysIndex = args.findIndex(arg => arg === '--days');
  if (daysIndex !== -1 && args[daysIndex + 1]) {
    days = parseInt(args[daysIndex + 1], 10) || 3;
    days = Math.min(Math.max(days, 1), 5); // 限制 1-5 天
  }
  
  try {
    const data = await fetchWeatherJSON(city);
    
    if (!data.weather || data.weather.length === 0) {
      console.error(`Error: City "${city}" not found or no data available`);
      process.exit(1);
    }
    
    if (hasForecast) {
      const weatherDays = parseWeatherData(data, days);
      showForecast(city, weatherDays);
    } else {
      showCurrentWeather(city, data);
    }
    
  } catch (error) {
    console.error('Error: Failed to fetch weather data');
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
