import 'package:flutter_dotenv/flutter_dotenv.dart';

class AccountInfo {
  String username;
  AccountInfo(this.username);
}

class AccountService {
  static String get _apiURL => dotenv.env['API_URL']!;

  static Future<AccountInfo> getCurrentAccount(String jwt) async {
    await Future.delayed(const Duration(seconds: 1));
    return AccountInfo("Timon");
  }
}
