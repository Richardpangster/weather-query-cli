#!/usr/bin/env node

import https from 'https';
import { IncomingMessage } from 'http';

const VERSION = '1.0.0';

function showHelp(): void {
  console.log(`
Weather Query CLI v${VERSION}

Usage:
  weather-query <city>     Query weather for a city
  weather-query --help     Show this help
  weather-query --version  Show version

Examples:
  weather-query Beijing
  weather-query 上海
`);
}

function showVersion(): void {
  console.log(VERSION);
}

function fetchWeather(city: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const encodedCity = encodeURIComponent(city);
    const url = `https://wttr.in/${encodedCity}?format=%C|%t|%h`;
    
    const req = https.get(url, { 
      headers: { 'User-Agent': 'curl/7.68.0' },
      timeout: 5000
    }, (res: IncomingMessage) => {
      let data = '';
      res.on('data', (chunk: Buffer) => data += chunk.toString());
      res.on('end', () => resolve(data.trim()));
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
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
  
  try {
    const result = await fetchWeather(city);
    
    if (result.includes('Unknown location')) {
      console.error(`Error: City "${city}" not found`);
      process.exit(1);
    }
    
    const [condition, temp, humidity] = result.split('|');
    
    console.log(`\n城市: ${city}`);
    console.log(`天气: ${condition}`);
    console.log(`温度: ${temp}`);
    console.log(`湿度: ${humidity}`);
    console.log();
    
  } catch (error) {
    console.error('Error: Failed to fetch weather data');
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
