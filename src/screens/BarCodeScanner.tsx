import React, { useEffect, useRef, useState } from "react";
import { BarcodeDetector } from "barcode-detector/ponyfill";
import "./BarCodeScanner.css";

export const BarCodeScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [detectedBarcodes, setDetectedBarcodes] = useState<string[]>([]);
  //FIXME:Formato POST es employeeId y date ISO
  useEffect(() => {
    // Verificar si el navegador soporta BarcodeDetector
    const checkBarcodeDetectorSupport = async () => {
      const supportedFormats = await BarcodeDetector.getSupportedFormats();
      if (supportedFormats.length === 0) {
        alert("BarcodeDetector no es compatible con este navegador.");
        return false;
      }
      return true;
    };

    // Inicializar el BarcodeDetector
    const barcodeDetector = new BarcodeDetector({
      formats: ["qr_code", "ean_13", "code_128", "code_39", "code_93"], // Formatos soportados
    });

    // Acceder a la cámara
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }, // Usar la cámara trasera
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error("Error al acceder a la cámara:", error);
      }
    };

    // Función para capturar un fotograma y detectar códigos de barras
    const detectBarcodes = async () => {
      if (!videoRef.current) return;

      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");

      if (!context) return;

      // Dibujar el fotograma actual en el canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convertir el canvas a un Blob
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        try {
          // Detectar códigos de barras en el Blob
          const barcodes = await barcodeDetector.detect(blob);
          if (barcodes.length > 0) {
            const barcodeValues = barcodes.map((barcode) => barcode.rawValue);
            setDetectedBarcodes(barcodeValues);
          }
        } catch (error) {
          console.error("Error al detectar códigos de barras:", error);
        }
      }, "image/png");
    };

    // Iniciar la cámara y la detección
    const init = async () => {
      const isSupported = await checkBarcodeDetectorSupport();
      if (!isSupported) return;

      await startCamera();
      setInterval(detectBarcodes, 1000); // Detectar cada segundo
    };

    init();

    // Limpiar al desmontar el componente
    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <section className="scanner">
      <h2>Detección de Códigos de Barras con Cámara Web</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: 500,
          height: 500,
          //transform: "scaleX(-1)",
        }}
      />
      <div>
        <h2>Códigos de Barras Detectados:</h2>
        <ul>
          {detectedBarcodes.map((barcode, index) => (
            <li key={index}>{barcode}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};
