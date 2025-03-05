import 'package:flutter/material.dart';
import 'package:frontend_mobile/screens/login_screen.dart';
import 'package:http/http.dart' as http;
import 'dart:convert'; 
import 'package:get_storage/get_storage.dart';

Future<void> main() async {
  await GetStorage.init();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: LoginPage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  List<String> _drivers = []; // List to hold drivers' data
  bool _isLoading = false; // Loading indicator

  // Function to fetch drivers' info
  Future<void> _fetchDrivers() async {
    setState(() {
      _isLoading = true; // Show loading indicator
    });

    try {
      final response = await http.get(Uri.parse('http://192.168.0.117:5000/drivers'));
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body); // Decode JSON
        setState(() {
          _drivers = data.map((driver) => driver.toString()).toList(); // Convert to list of strings
        });
      } else {
        setState(() {
          _drivers = ['Failed to load data: ${response.statusCode}'];
        });
      }
    } catch (e) {
      setState(() {
        _drivers = ['Failed to fetch data: $e'];
      });
    } finally {
      setState(() {
        _isLoading = false; // Hide loading indicator
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            _isLoading
                ? const CircularProgressIndicator() // Show a loading indicator
                : Expanded(
                    child: ListView.builder(
                      itemCount: _drivers.length,
                      itemBuilder: (context, index) {
                        return Text(
                          _drivers[index],
                          style: Theme.of(context).textTheme.bodyMedium,
                        );
                      },
                    ),
                  ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _fetchDrivers, // Fetch data when button pressed
              child: const Text('Fetch Drivers Info'),
            ),
          ],
        ),
      ),
    );
  }
}
