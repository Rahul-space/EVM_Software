
#include <Adafruit_Fingerprint.h> // 1000025491D7  // 10000363FF8F
#include <HardwareSerial.h>
#include <LiquidCrystal.h>
const int rs = 5, en = 18, d4 = 19, d5 = 21, d6 = 22, d7 = 23;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);
Adafruit_Fingerprint finger = Adafruit_Fingerprint(&Serial2);
#include <HTTPClient.h>
#include <WiFi.h>
#include <ArduinoJson.h>
#include "SoftwareSerial.h"
const int BUZZER = 26;
const int t = 4;
int t1;
#define RX_PIN 33
#define TX_PIN 27

SoftwareSerial mySerial(RX_PIN, TX_PIN);
uint8_t id;
int q, w, e1, r, y, M, V, k, h;
int q1, w1, e11, r1, a1;
int p1, o1, u1, n1, d1;
String rec;
int l = 0;
int a, b, c, d, e, f, g;
int dmk = 0;
int admk = 0;
int ntk = 0;
int bjp = 0;
String sensor1_status;
String sensor2_status;
String sensor3_status;
String sensor4_status;
String sensor5_status;
String sensor6_status;
String sensor7_status;
String sensor8_status;
String sms_status;
String mode_data;
void setup() {
  lcd.begin(16, 2);
  pinMode(t, INPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(2, OUTPUT);
  pinMode(15, OUTPUT);
  pinMode(13, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(34, INPUT);
  pinMode(25, INPUT);
  pinMode(35, INPUT);
  pinMode(36, INPUT);
  pinMode(32, INPUT);
  digitalWrite(BUZZER, LOW);
  Serial.begin(9600);
  mySerial.begin(9600);
  //mySerial.begin(9600, SERIAL_8N1, 25, 27);
  WiFi.begin("iotbegin484", "iotbegin484");  //WiFi connection

  while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection completion
    lcd.setCursor(0, 0);
    lcd.print("connect to WIFI    ");
    lcd.setCursor(0, 1);
    lcd.print("iotbegin484");
    //delay(3000);

    Serial.println("Waiting for Wi-Fi connection");
  }
  // set the data rate for the sensor serial port
  finger.begin(57600);
  delay(5);
  Serial.println("");
  Serial.println(finger.verifyPassword());
  if (finger.verifyPassword()) {
    Serial.println("Found fingerprint sensor!");
  }
  /*else 
  {
    Serial.println("Did not find fingerprint sensor :(");
    while (1) 
    { 
      delay(1); 
    }
  }*/
  /* Serial.println(F("Reading sensor parameters"));
  finger.getParameters();
  Serial.print(F("Status: 0x")); 
  Serial.println(finger.status_reg, HEX);
  Serial.print(F("Sys ID: 0x")); 
  Serial.println(finger.system_id, HEX);
  Serial.print(F("Capacity: ")); 
  Serial.println(finger.capacity);
  Serial.print(F("Security level: ")); 
  Serial.println(finger.security_level);
  Serial.print(F("Device address: ")); 
  Serial.println(finger.device_addr, HEX);
  Serial.print(F("Packet len: ")); 
  Serial.println(finger.packet_len);
  Serial.print(F("Baud rate: ")); 
  Serial.println(finger.baud_rate); 
  finger.getTemplateCount();
  lcd.setCursor(0, 1);
  lcd.print(("TEMP.STORED=")); 
  lcd.print(finger.templateCount);
  lcd.setCursor(0, 0);
  lcd.print("T.STORED=");  
  lcd.print(finger.packet_len); */

  delay(3000);
  if (finger.templateCount == 0) {
    Serial.print("Sensor doesn't contain any fingerprint data. Please run the 'enroll' example.");
  } else {
    Serial.println("Waiting for valid finger...");
    Serial.print("Sensor contains ");
    Serial.print(finger.templateCount);
    Serial.println(" templates");
  }
}
void loop()  // run over and over again
{

  h = h + 1;
  Serial.println(h);
  delay(1000);
  lcd.setCursor(0, 1);
  lcd.print("T ; ");
  lcd.print(h);
  lcd.print("  ");
  t1 = 1 - digitalRead(t);
  if (t1 == 1) {
    lcd.setCursor(0, 0);
    lcd.print("FINGER CONFIG   ");
    lcd.setCursor(0, 1);
    lcd.print("    MODE    ");
    config();
  }
  if (k == 0) {
    getFingerprintID();
    lcd.setCursor(0, 0);
    lcd.print("PLACE THE CARD    ");
    lcd.setCursor(0, 1);
    lcd.print("               ");
  }
  if (mySerial.available()) {
    rec = mySerial.readString();
    Serial.println(rec);
    k = 1;
  }
  if (rec == "530024949B78") {
    q = 1;
    q1 = q1 + 1;
    sensor1_status = " PERSON 1 ";
    sensor2_status = "530024949B78";
    rec = "aaaaaaaaaaaaaaaaa";
  }
  if (rec == "530024B78040") {
    w = 1;
    w1 = w1 + 1;
    sensor1_status = " PERSON 2 ";
    sensor2_status = "530024B78040";
    rec = "aaaaaaaaaaaaaaaaa";
  }
  if (rec == "1000025491D7") {
    e1 = 1;
    e11 = e11 + 1;
    sensor1_status = " PERSON 3 ";
    sensor2_status = "5300250C92E8";
    rec = "aaaaaaaaaaaaaaaaa";
  }
  if (rec == "10000363FF8F") {
    r = 1;
    r1 = r1 + 1;
    sensor1_status = " PERSON 4 ";
    sensor2_status = "53002419DAB4";
    rec = "aaaaaaaaaaaaaaaaa";
  }
  if (rec == "530023EB0299") {
    y = 1;
    a1 = a1 + 1;
    sensor1_status = " PERSON 5 ";
    sensor2_status = "530023EB0299";
    rec = "aaaaaaaaaaaaaaaaa";
  }
  if (((a1 > 1) && (y == 1)) || ((w1 > 1) && (w == 1)) || ((r1 > 1) && (r == 1)) || ((e11 > 1) && (e1 == 1)) || ((q1 > 1) && (q == 1))) {
    k = 0;
    lcd.setCursor(0, 0);
    lcd.print("ALREADY VOTED  ");
    delay(3000);
    lcd.clear();
    a1 = 0;
    w1 = 0;
    r1 = 0;
    e11 = 0;
    q1 = 0;
  }
  if (k == 1) {
    getFingerprintID();
    lcd.setCursor(0, 0);
    lcd.print("PLACE THE FINGER");
    lcd.setCursor(0, 1);
    lcd.print("               ");
    doallow();
  }
  if ((q == 1) && (V == 1)) {
    l = l + 1;
    allow();
    p1 = 1;
  }
  if ((w == 1) && (V == 2)) {
    l = l + 1;
    allow();
    o1 = 1;
  }
  if ((e1 == 1) && (V == 3)) {
    l = l + 1;
    u1 = 1;
    allow();
  }
  if ((r == 1) && (V == 4)) {
    l = l + 1;
    n1 = 1;
    allow();
  }
  if ((y == 1) && (V == 5)) {
    l = l + 1;
    d1 = 1;
    allow();
  }
  if ((q == 1) && (V == 6)) {
    l = l + 1;
    allow();
  }
  if ((q == 1) && (V == 9)) {
    l = l + 1;
    p1 = 1;
    allow();
  }
  if ((M == 1)) {

    if ((q == 1)) {
      p1 = 1;
    }
    if ((w == 1)) {

      o1 = 1;
    }
    if ((e1 == 1)) {
      u1 = 1;
    }
    if (r == 1) {
      n1 = 1;
    }
    if ((y == 1)) {
      d1 = 1;
    }
    l = l + 1;
    allow();
  }
  g = 1 - digitalRead(25);
  if (g == 1) {
    resul();
  }
  if (h == 150) {
    stat();
    h = 0;
    p1 = 0;
    d1 = 0;
    o1 = 0;
    u1 = 0;
    n1 = 0;
  }
}
uint8_t getFingerprintID() {
  uint8_t p = finger.getImage();
  switch (p) {
    case FINGERPRINT_OK:
      // Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
      //Serial.println("No finger detected");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      //Serial.println("Communication error");
      return p;
    case FINGERPRINT_IMAGEFAIL:
      //Serial.println("Imaging error");
      return p;
    default:
      //Serial.println("Unknown error");
      return p;
  }
  // OK success!
  p = finger.image2Tz();
  switch (p) {
    case FINGERPRINT_OK:
      //Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      //Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      //Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      //Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      // Serial.println("Could not find fingerprint features");
      return p;
    default:
      //Serial.println("Unknown error");
      return p;
  }
  // OK converted!
  p = finger.fingerSearch();
  if (p == FINGERPRINT_OK) {
    lcd.setCursor(0, 0);
    lcd.print("  FINGERPRINT   ");
    lcd.setCursor(0, 1);
    lcd.print("    MATCHED     ");
    digitalWrite(BUZZER, LOW);
   // delay(2000);


    if ((finger.fingerID == 1)) {
      Serial.println('a');
      V = 1;
          lcd.setCursor(0, 0);
    lcd.print("ID:");
    lcd.print(finger.fingerID);
    lcd.print("             ");
    lcd.setCursor(0, 1);
    lcd.print("PERSON ");
    lcd.print(finger.fingerID);
    lcd.print("             ");
    } else if ((finger.fingerID == 2)) {
      Serial.println('b');
      V = 2;
          lcd.setCursor(0, 0);
    lcd.print("ID:");
    lcd.print(finger.fingerID);
    lcd.print("             ");
    lcd.setCursor(0, 1);
    lcd.print("PERSON ");
    lcd.print(finger.fingerID);
    lcd.print("             ");
    } else if ((finger.fingerID == 3)) {
      Serial.println('c');
      V = 3;
          lcd.setCursor(0, 0);
    lcd.print("ID:");
    lcd.print(finger.fingerID);
    lcd.print("             ");
    lcd.setCursor(0, 1);
    lcd.print("PERSON ");
    lcd.print(finger.fingerID);
    lcd.print("             ");
    } else if ((finger.fingerID == 4)) {
      Serial.println('d');
    //  V = 4;
    } else if ((finger.fingerID == 5)) {
      Serial.println('e');
      V = 5;
    } else if ((finger.fingerID == 6)) {
      Serial.println('f');
      V = 6;
    } else if ((finger.fingerID == 7)) {
      Serial.println('g');
      V = 7;
    } else if ((finger.fingerID == 8)) {
      Serial.println('h');
      V = 1;
      lcd.setCursor(0, 0);
    lcd.print("ID: 1");
    //lcd.print(finger.fingerID);
    lcd.print("             ");
    lcd.setCursor(0, 1);
    lcd.print("PERSON 1");
    
    lcd.print("             ");
    } else if ((finger.fingerID == 9)) {
      Serial.println('i');
      V = 5;
          lcd.setCursor(0, 0);
    lcd.print("ID: 5");
    //lcd.print(finger.fingerID);
    lcd.print("             ");
    lcd.setCursor(0, 1);
    lcd.print("PERSON 5");
    
    lcd.print("             ");
    } else if ((finger.fingerID == 10)) {
      Serial.println('j');
      V = 10;
    }
    else if ((finger.fingerID == 11)) {
      Serial.println('j');
      V = 4;
    lcd.setCursor(0, 0);
    lcd.print("ID: 4");
    lcd.print("             ");
    lcd.setCursor(0, 1);
    lcd.print("PERSON 4");
    lcd.print("             ");
    }

  delay(3000);
    //Serial.println("Found a print match!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    //Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_NOTFOUND) {
    Serial.println('z');
    lcd.setCursor(0, 0);
    lcd.print("FINGER  PRINT     ");
    lcd.setCursor(0, 1);
    lcd.print(" NOT MATCH        ");
    delay(3000);
    //Serial.println("Did not find a match");
    iot2();
    digitalWrite(BUZZER, HIGH);
    delay(3000);
    digitalWrite(BUZZER, LOW);
    doallow();


    //delay(500);
    //digitalWrite(BUZZER,HIGH);
    // delay(500);
    //digitalWrite(BUZZER,LOW);
    return p;

  } else {
    //Serial.println("Unknown error");
    return p;
  }

  // found a match!
  // Serial.print("Found ID #"); Serial.print(finger.fingerID);
  // Serial.print(" with confidence of "); Serial.println(finger.confidence);

  return finger.fingerID;
}

// returns -1 if failed, otherwise returns ID #
int getFingerprintIDez() {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK) return -1;

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK) return -1;

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK) return -1;

  // found a match!
  //Serial.print("Found ID #"); Serial.print(finger.fingerID);
  //Serial.print(" with confidence of "); Serial.println(finger.confidence);
  return finger.fingerID;
}

void config()  // run over and over again
{
  Serial.println("Ready to enroll a fingerprint!");
  Serial.println("Please type in the ID # (from 1 to 127) you want to save this finger as...");

  id = readnumber();
  if (id == 0) {
    // ID #0 not allowed, try again!
    return;
  }
  Serial.print("Enrolling ID #");
  Serial.println(id);
  while (!getFingerprintEnroll())
    ;
  loop();
}

uint8_t getFingerprintEnroll() {
  int p = -1;
  Serial.print("Waiting for valid finger to enroll as #");
  Serial.println(id);
  lcd.setCursor(0, 0);
  lcd.print("Place the finger     ");
  lcd.setCursor(0, 1);
  lcd.print("ID ");
  lcd.print(id);
  lcd.print("                     ");
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image taken");
        lcd.setCursor(0, 0);
        lcd.print("Image taken     ");
        delay(1000);
        break;
      case FINGERPRINT_NOFINGER:
        Serial.println(".");
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        break;
      case FINGERPRINT_IMAGEFAIL:
        Serial.println("Imaging error");
        break;
      default:
        Serial.println("Unknown error");
        break;
    }
  }

  // OK success!

  p = finger.image2Tz(1);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      lcd.setCursor(0, 1);
      lcd.print("Image converted      ");
      delay(1000);
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Remove finger      ");
  Serial.println("Remove finger");
  delay(2000);
  p = 0;
  while (p != FINGERPRINT_NOFINGER) {
    p = finger.getImage();
  }
  Serial.print("ID ");
  Serial.println(id);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Place same finger     ");
  lcd.setCursor(0, 1);
  //lcd.print("ID ");
  //lcd.print(id);
  lcd.print("                      ");
  p = -1;
  Serial.println("Place same finger again");
  while (p != FINGERPRINT_OK) {
    p = finger.getImage();
    switch (p) {
      case FINGERPRINT_OK:
        Serial.println("Image taken");
        break;
      case FINGERPRINT_NOFINGER:
        Serial.print(".");
        break;
      case FINGERPRINT_PACKETRECIEVEERR:
        Serial.println("Communication error");
        break;
      case FINGERPRINT_IMAGEFAIL:
        Serial.println("Imaging error");
        break;
      default:
        Serial.println("Unknown error");
        break;
    }
  }

  // OK success!

  p = finger.image2Tz(2);
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  // OK converted!
  Serial.print("Creating model for #");
  Serial.println(id);

  p = finger.createModel();
  if (p == FINGERPRINT_OK) {
    lcd.setCursor(0, 0);
    lcd.print("Prints matched!    ");
    delay(2000);
    Serial.println("Prints matched!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_ENROLLMISMATCH) {
    Serial.println("Fingerprints did not match");
    lcd.setCursor(0, 0);
    lcd.print("Fingerprints did     ");
    lcd.setCursor(0, 1);
    lcd.print("not match            ");
    delay(2000);
    return p;
  } else {
    Serial.println("Unknown error");
    return p;
  }

  p = finger.storeModel(id);
  if (p == FINGERPRINT_OK) {
    Serial.print("ID ");
    Serial.println(id);
    lcd.setCursor(0, 1);
    lcd.print("ID ");
    lcd.print(id);
    lcd.print("    ");
    lcd.setCursor(7, 1);
    lcd.print("Stored!        ");
    Serial.println("Stored!");
    delay(2000);
    t1 = 1;
    loop();
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("  Communication  ");
    lcd.setCursor(0, 1);
    lcd.print("      error      ");
    delay(1000);
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_BADLOCATION) {
    Serial.println("Could not store in that location");
    return p;
  } else if (p == FINGERPRINT_FLASHERR) {
    Serial.println("Error writing to flash");
    return p;
  } else {
    Serial.println("Unknown error");
    return p;
  }
}
uint8_t readnumber(void) {
  uint8_t num = 0;
  int count = 0;
  int n = 0;
  int nu = 0;
  int i = 1;
  while (n == 0) {
    t1 = 1 - digitalRead(t);
    if (t1 == 1) {
      nu++;
      count++;
      delay(500); 
    } else {
      if ((t1 == 0) && (count == i)) {
        nu = 0;
        num = count;
        i = i + 1;
      }
    }
    if (nu == 5) {
      n = 1;
    }
    lcd.setCursor(10, 1);
    lcd.print("ID=");
    lcd.print(num);
    lcd.print("    ");
  }
  return num;
}

void allow() {
  digitalWrite(2, HIGH);
  digitalWrite(15, HIGH);
  digitalWrite(13, HIGH);
  digitalWrite(12, HIGH);
  while (l == 1)  // 1
  {
    a = digitalRead(36);
    b = digitalRead(34);
    c = digitalRead(35);
    d = digitalRead(32);
    lcd.setCursor(0, 0);
    lcd.print("1 : ADMK 2: DMK       ");
    lcd.setCursor(0, 1);
    lcd.print("3 : NTK  4: BJP       ");
    if ((a == 1) || (b == 1) || (c == 1) || (d == 1)) {
            digitalWrite(BUZZER, HIGH);
    delay(1000);
    digitalWrite(BUZZER, LOW);
      if (a == 1) {
        admk = admk + 1;
      }
      if (b == 1) {
        dmk = dmk + 1;
      }
      if (c == 1) {
        ntk = ntk + 1;
      }
      if (d == 1) {
        bjp = bjp + 1;
      }
      l = l + 1;
      sensor3_status = " VOTED ";
      iot();
    }
    Serial.println(l);
  }


  while (l == 3)  // 2
  {
    a = digitalRead(36);
    b = digitalRead(34);
    c = digitalRead(35);
    d = digitalRead(32);
    lcd.setCursor(0, 0);
    lcd.print("1 : DMK  2: ADMK       ");
    lcd.setCursor(0, 1);
    lcd.print("3 : BJP  4: NTK       ");
    if ((a == 1) || (b == 1) || (c == 1) || (d == 1)) {
     digitalWrite(BUZZER, HIGH);
    delay(1000);
    digitalWrite(BUZZER, LOW);

      lcd.setCursor(0, 0);
      lcd.print(" VOTED            ");
      lcd.setCursor(0, 1);
      lcd.print("   SUCCESFULL         ");
      if (a == 1) {
        dmk = dmk + 1;
      }
      if (b == 1) {
        admk = admk + 1;
      }
      if (c == 1) {
        bjp = bjp + 1;
      }
      if (d == 1) {
        ntk = ntk + 1;
      }
      l = l + 1;
      sensor3_status = " VOTED ";
      iot();
    }
    Serial.println(l);
  }
  while (l == 5)  // 3
  {
    a = digitalRead(36);
    b = digitalRead(34);
    c = digitalRead(35);
    d = digitalRead(32);
    lcd.setCursor(0, 0);
    lcd.print("1 : DMK  2: BJP       ");
    lcd.setCursor(0, 1);
    lcd.print("3 : ADMK 4: NTK       ");
    if ((a == 1) || (b == 1) || (c == 1) || (d == 1)) {

           digitalWrite(BUZZER, HIGH);
    delay(1000);
    digitalWrite(BUZZER, LOW);
      lcd.setCursor(0, 0);
      lcd.print(" VOTED            ");
      lcd.setCursor(0, 1);
      lcd.print("   SUCCESFULL         ");
      if (a == 1) {
        dmk = dmk + 1;
      }
      if (c == 1) {
        admk = admk + 1;
      }
      if (b == 1) {
        bjp = bjp + 1;
      }
      if (d == 1) {
        ntk = ntk + 1;
      }
      l = l + 1;
      sensor3_status = " VOTED ";
      iot();
    }
    Serial.println(l);
  }
  while (l == 7)  // 3
  {     digitalWrite(BUZZER, HIGH);
    delay(1000);
    digitalWrite(BUZZER, LOW);
    a = digitalRead(36);
    b = digitalRead(34);
    c = digitalRead(35);
    d = digitalRead(32);
    lcd.setCursor(0, 0);
    lcd.print("1 : NTK  2: ADMK      ");
    lcd.setCursor(0, 1);
    lcd.print("3 : DMK  4: BJP       ");
    if ((a == 1) || (b == 1) || (c == 1) || (d == 1)) {
      lcd.setCursor(0, 0);
      lcd.print(" VOTED            ");
      lcd.setCursor(0, 1);
      lcd.print("   SUCCESFULL         ");
      if (a == 1) {
        ntk = ntk + 1;
      }
      if (b == 1) {
        admk = admk + 1;
      }
      if (c == 1) {
        dmk = dmk + 1;
      }

      if (d == 1) {
        bjp = bjp + 1;
      }
      l = l + 1;
      sensor3_status = " VOTED ";
      iot();
    }

    Serial.println(l);
  }

  while (l == 9)  // 4
  {     digitalWrite(BUZZER, HIGH);
    delay(1000);
    digitalWrite(BUZZER, LOW);
    a = digitalRead(36);
    b = digitalRead(34);
    c = digitalRead(35);
    d = digitalRead(32);
    lcd.setCursor(0, 0);
    lcd.print("1 : BJP 2: ADMK      ");
    lcd.setCursor(0, 1);
    lcd.print("3 : DMK 4: NTK       ");
    if ((a == 1) || (b == 1) || (c == 1) || (d == 1)) {

      if (a == 1) {
        bjp = bjp + 1;
      }
      if (b == 1) {
        admk = admk + 1;
      }
      if (c == 1) {
        dmk = dmk + 1;
      }

      if (d == 1) {
        ntk = ntk + 1;
      }
      l = l + 1;
      sensor3_status = " VOTED ";
      iot();
    }

    Serial.println(l);
  }
  M = 0;
  lcd.clear();
  iot2();
}

void resul() {


  lcd.setCursor(0, 0);
  lcd.print("RESULT          ");
  delay(3000);
  lcd.setCursor(0, 0);
  lcd.print("ADMK: ");
  lcd.print(admk);
  lcd.print(" DMK: ");
  lcd.print(dmk);
  lcd.setCursor(0, 1);
  lcd.print("NTK: ");
  lcd.print(ntk);
  lcd.print(" BJP: ");
  lcd.print(bjp);
  delay(5000);
}
void doallow() {
  HTTPClient http;
  http.begin("http://iotbegineer.com/api/devices/serialData");  //Specify request destination
  http.addHeader("username", "iotbegin484");                    //Specify content-type header
  int httpCode_string = http.GET();
  String payload_string = http.getString();  //Get the response payload
  http.end();                                //Close connection
  delay(500);
  StaticJsonDocument<300> parseserial_string;
  deserializeJson(parseserial_string, payload_string);
  JsonObject serial_string = parseserial_string["data"][0];
  String output_string = serial_string["serial_data"];
  if (output_string != "null") {
    Serial.println(output_string);
    mode_data = output_string;
    Serial.println(mode_data);
    if (mode_data == "YES") {
      M = 1;
    }
    if (mode_data == "NO") {
      k = 0;
    }
  }
}

void iot() {s
  lcd.clear();
  DynamicJsonDocument jsonBuffer(JSON_OBJECT_SIZE(3) + 300);
  JsonObject root = jsonBuffer.to<JsonObject>();

  root["sensor1"] = sensor1_status;
  root["sensor2"] = sensor2_status;
  root["sensor3"] = sensor3_status;
  root["sensor4"] = sensor4_status;
  root["sensor5"] = sensor5_status;
  root["sensor6"] = sensor6_status;
  root["sensor7"] = sensor7_status;
  root["sensor8"] = sensor8_status;
  root["sms"] = "1";
  String json;
  serializeJson(jsonBuffer, json);
  if (sensor1_status != "null") {
    HTTPClient http;                                   //Declare object of class HTTPClient
    http.begin("http://iotbegineer.com/api/sensors");  //Specify request destination
    http.addHeader("username", "iotbegin484");         //Specify content-type header
    http.addHeader("Content-Type", "application/json");
    int httpCode = http.POST(json);     //Send the request
    String payload = http.getString();  //Get the response payload
    http.end();                         //Close connection
  //  delay(500);
    
    V = 0;
    k = 0;
    // sensor1_status = "             ";
    //  sensor2_status = "             ";
    //sensor3_status = "             ";
    rec = "*****************";
    q = 0;
    w = 0;
    e1 = 0;
    r = 0;
    y = 0;
    digitalWrite(2, LOW);
    digitalWrite(15, LOW);
    digitalWrite(13, LOW);
    digitalWrite(12, LOW);
  }

//  DynamicJsonDocument jsonBuffer(JSON_OBJECT_SIZE(3) + 300);
 // JsonObject root = jsonBuffer.to<JsonObject>(); 
 // String json;
  serializeJson(jsonBuffer, json);
    HTTPClient http;                                   //Declare object of class HTTPClient
    http.begin("http://192.168.43.30:8800/evm/vote/"  );  //Specify request destination
    http.addHeader("username",  sensor2_status);  
 //   http.addHeader("Content-Type", "application/json");
   int httpCode = http.POST(json);     //Send the request
   String payload = http.getString();  //Get the response payload
    http.end();                         //Close connection
  //  delay(500);
    lcd.clear();
}
void stat() {
  lcd.setCursor(0, 0);
  lcd.print("Sending message  ");
  lcd.setCursor(0, 1);
  lcd.print("not voted person  ");
  if (p1 == 0) {

    sensor1_status = " PERSON 1 ";
    sensor2_status = "530024949B78";
    sensor3_status = " NOT VOTED";
   // VOT1();
    iot();
  }
  if (o1 == 0) {

    sensor1_status = " PERSON 2 ";
    sensor2_status = "530024B78040";
    sensor3_status = " NOT VOTED";
    //VOT2();
    iot();
  }
  if (n1 == 0) {
    sensor1_status = " PERSON 3 ";
    sensor2_status = "5300250C92E8";
    sensor3_status = " NOT VOTED";
    //VOT3();
    iot();
  }
  if (u1 == 0) {
    sensor1_status = " PERSON 4 ";
    sensor2_status = "53002419DAB4";
    sensor3_status = " NOT VOTED";
    //VOT4();
    iot();
  }
  if (d1 == 0) {
    sensor1_status = " PERSON 5 ";
    sensor2_status = "530023EB0299";
    sensor3_status = " NOT VOTED";
    //VOT5();
    iot();
  }
  lcd.clear();
}


void iot2() {
   DynamicJsonDocument jsonBuffer(JSON_OBJECT_SIZE(3) + 300);
  JsonObject root = jsonBuffer.to<JsonObject>();
    String json;
    serializeJson(jsonBuffer, json);
    HTTPClient http;                                   //Declare object of class HTTPClient
    http.begin("http://192.168.43.30:8800/evm/not/"  );  //Specify request destination
    http.addHeader("username",  sensor2_status);  
 //   http.addHeader("Content-Type", "application/json");
   int httpCode = http.POST(json);     //Send the request
   String payload = http.getString();  //Get the response payload
    http.end();                         //Close connection
    delay(500);
    lcd.clear();
   
}

EVOTING.txt
Displaying EVOTING.txt.