import 'package:adventure_map_app/components/AdventureMapAppBar.dart';
import 'package:adventure_map_app/pages/authentication/login_page.dart';
import 'package:adventure_map_app/pages/authentication/register_page.dart';
import 'package:adventure_map_app/providers/auth_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'pages/home_page.dart';

void main() async {
  await dotenv.load(fileName: ".env");
  runApp(ChangeNotifierProvider(
      create: (context) => AuthProvider(), child: AdventureMap()));
}

final GoRouter _router = GoRouter(routes: [
  ShellRoute(
      builder: (context, state, child) {
        return Scaffold(
          appBar: AdventureMapAppBar(),
          body: Center(
            child: child,
          ),
        );
      },
      routes: [
        GoRoute(path: "/", builder: ((context, state) => const HomePage())),
        GoRoute(
            path: "/login", builder: ((context, state) => const LoginPage())),
        GoRoute(
            path: "/register",
            builder: ((context, state) => const RegisterPage())),
      ])
]);

class AdventureMap extends StatelessWidget {
  const AdventureMap({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
    );
  }
}
