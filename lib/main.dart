import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mihir_portfolio/pages/home_page.dart';
import 'package:mihir_portfolio/routes/router_constants.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
     home: HomePage(),
     
      
    );
  }
}
