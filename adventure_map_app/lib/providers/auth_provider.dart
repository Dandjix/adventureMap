import 'package:adventure_map_app/services/account_service.dart';
import 'package:flutter/foundation.dart';
import 'package:adventure_map_app/services/auth_service.dart';
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
  String? _jwt;
  String? _username;

  bool get isAuthenticated => _isAuthenticated;
  String? get username => _username;
  String? get jwt => _jwt;

  Future<void> login(String jwt) async {
    _isAuthenticated = true;
    _jwt = jwt;
    writeJWT(jwt);
    var account = await AccountService.getCurrentAccount(jwt);
    _username = account.username;
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
