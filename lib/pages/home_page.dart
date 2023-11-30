import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:particles_fly/particles_fly.dart';

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return
        
    Scaffold(
      body: SingleChildScrollView(
        child: Center(
          child: Stack(
            children: [
              Container(
                height: Get.height,
                width: Get.width,
                color: const Color(0xFF252524),
                child: ParticlesFly(
                    isRandomColor: true,
                    height: Get.height,
                    width: Get.width,
                    connectDots: false,
                    isRandSize: true,
                    randColorList: [
                      Colors.green.withOpacity(0.6),
                      Colors.yellow.withOpacity(0.8),
                      Colors.blue
                    ],
                    maxParticleSize: 4,
                    
                    numberOfParticles: 200),
              ),
              
            ],
          ),
        ),
      ),
    );
    
  }
}
