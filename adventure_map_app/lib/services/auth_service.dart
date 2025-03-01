import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:convert';

class AuthService {
  static String get _apiURL => dotenv.env['API_URL']!;

  static Future<Map<String, dynamic>> login(
      String username, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$_apiURL/auth/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'username': username, 'password': password}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return {
          'success': true,
          'message': 'Login successful',
          'token': data["token"]
        };
      } else {
        // Handle failure
        final data = jsonDecode(response.body);
        return {'success': false, 'message': data['message'] ?? 'Login failed'};
      }
    } catch (e) {
      // Handle error
      if (kDebugMode) {
        debugPrint("error : $e");
      }
      return {'success': false, 'message': 'Error connecting to the server'};
    }
  }
}
