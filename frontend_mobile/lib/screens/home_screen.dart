import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:get_storage/get_storage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {


  @override
  void initState() {
    super.initState();
    sendLocation();
  }

 
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: [
          Image.asset(
            'assets/backgroundLogin.jpg', 
            fit: BoxFit.cover,
          ),
          Container(
            color: Colors.black.withOpacity(0.5), 
          ),
          
        ],
      ),
    );
  }
}


Future<void> sendLocation() async {
  bool serviceEnabled;
  LocationPermission permission;

  serviceEnabled = await Geolocator.isLocationServiceEnabled();
  if (!serviceEnabled) {
    print('Location services are disabled.');
    return;
  }

  // Request permission
  permission = await Geolocator.checkPermission();
  if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
    if (permission == LocationPermission.denied) {
      print('Location permissions are denied.');
      return;
    }
  }

  if (permission == LocationPermission.deniedForever) {
    print('Location permissions are permanently denied.');
    return;
  }

  // Get location
  Position position = await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high);

  double latitude = position.latitude;
  double longitude = position.longitude;

  print('Latitude: $latitude, Longitude: $longitude');

  sendToServer(latitude, longitude);
}

Future<void> sendToServer(double lat, double lon) async {
  print("Sendtoserver called");
  final storage = GetStorage();
  String? driverID = storage.read('driverID');
  driverID ??= "unknown";
  print("Sendtoserver called1");

  String url = "http://192.168.0.106:5000/drivers/location"; 
  print("Sendtoserver called2");
 var response = await http.post(
    Uri.parse(url),
    headers: {"Content-Type": "application/json"},
    body: jsonEncode({
      "driverID": driverID,
      "locationLong": lon,
      "locationLat": lat,
    }),
  );
  print("Driver ID: $driverID");
  print("Latitude: $lat, Longitude: $lon");

  if (response.statusCode == 200) {
    print("Location updated successfully");
  } else {
    print("Failed to update location: ${response.body}");
  }
}
