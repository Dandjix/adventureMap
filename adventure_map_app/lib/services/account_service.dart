import 'dart:convert';

import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

class AccountInfo {
  String username;
  String email;
  String accountType;
  String role;
  AccountInfo(this.username, this.email, this.accountType, this.role);

  factory AccountInfo.fromJson(Map<String, dynamic> json) {
    return AccountInfo(
        json['username'], json['email'], json["account_type"], json["role"]);
  }
}

class AccountService {
  static String get _apiURL => dotenv.env['API_URL']!;
  static Future<AccountInfo> getCurrentAccount(String jwt) async {
    try {
      final response = await http.get(Uri.parse('$_apiURL/account'),
          headers: {'Authorization': 'Bearer $jwt'});

      if (response.statusCode != 200) {
        throw Exception("Failed. Body : ${response.body}");
      }
      final data = jsonDecode(response.body);
      return AccountInfo.fromJson(data);
    } catch (e) {
      throw Exception("Error fetching account info : $e");
    }
  }
}
