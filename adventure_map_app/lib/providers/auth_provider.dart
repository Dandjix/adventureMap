import 'package:adventure_map_app/services/account_service.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

// Create storage
final storage = FlutterSecureStorage();

Future<String> readJWT() async {
  String jwt = await storage.read(key: "jwt") ?? "";
  return jwt;
}

void writeJWT(String jwt) async {
  await storage.write(key: "jwt", value: jwt);
}

class AuthProvider extends ChangeNotifier {
  bool _isAuthenticated = false;

  String? _username;
  String? _email;
  String? _accountType;
  String? _role;

  String? _jwt;

  bool get isAuthenticated => _isAuthenticated;
  String? get username => _username;
  String? get email => _email;
  String? get accountType => _accountType;
  String? get role => _role;

  String? get jwt => _jwt;

  Future<void> login(String jwt) async {
    _isAuthenticated = true;
    _jwt = jwt;
    writeJWT(jwt);
    var account = await AccountService.getCurrentAccount(jwt);
    _username = account.username;
    _email = account.email;
    _accountType = account.accountType;
    _role = account.role;
    // Handle error
    if (kDebugMode) {
      debugPrint("got username : ${username!}");
    }

    notifyListeners(); // Notify UI to rebuild
  }

  void logout() {
    _isAuthenticated = false;
    _username = null;
    writeJWT("");
    notifyListeners(); // Notify UI to rebuild
  }
}
