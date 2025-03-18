import 'package:geolocator/geolocator.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> sendLocation() async {
  bool serviceEnabled;
  LocationPermission permission;

  // Check if location service is enabled
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

  // Send data to backend
  await sendToServer(latitude, longitude);
}

Future<void> sendToServer(double lat, double lon) async {
  String url = "http://192.168.0.106:5000/drivers/location"; // Update with your actual API URL

  var response = await http.post(
    Uri.parse(url),
    headers: {"Content-Type": "application/json"},
    body: jsonEncode({"latitude": lat, "longitude": lon}),
  );


}
