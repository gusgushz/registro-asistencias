import React, { useEffect, useRef, useState } from "react";
import { BarcodeDetector } from "barcode-detector/ponyfill";
import "./BarCodeScanner.css";
import ModalScanner from "../components/scanner/modalScanner";

export const BarCodeScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [detectedBarcodes, setDetectedBarcodes] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isScanning, setIsScanning] = useState(true); 

  useEffect(() => {
    const checkBarcodeDetectorSupport = async () => {
      const supportedFormats = await BarcodeDetector.getSupportedFormats();
      if (supportedFormats.length === 0) {
        alert("BarcodeDetector no es compatible con este navegador.");
        return false;
      }
      return true;
    };

    const barcodeDetector = new BarcodeDetector({
      formats: ["qr_code", "ean_13", "code_128", "code_39", "code_93"],
    });

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error("Error al acceder a la cámara:", error);
      }
    };

    const detectBarcodes = async () => {
      if (!videoRef.current || !isScanning) return; 

      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");

      if (!context) return;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        try {
          const barcodes = await barcodeDetector.detect(blob);
          if (barcodes.length > 0) {
            const barcodeValue = barcodes[0].rawValue.trim();
            setDetectedBarcodes(barcodeValue);
            // setModalMessage(`Detected Barcodes: ${barcodeValues.join(", ")}`);
            setIsScanning(false);

            setModalMessage(`Codigo detectado: ${barcodeValue}`)
            setIsModalOpen(true);

            await registerAssist(barcodeValue); 
            // setTimeout(() => {
            //   setIsModalOpen(false);
            //   setIsScanning(true);  // Reiniciar el escaneo después de que se cierra el modal
            // }, 7000); //
          }
        } catch (error) {
          console.error("Error al detectar códigos de barras:", error);
        }
      }, "image/png");
    };

    const init = async () => {
      const isSupported = await checkBarcodeDetectorSupport();
      if (!isSupported) return;

      await startCamera();
      setInterval(detectBarcodes, 2000);
    };

    init();

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [isScanning]);

  const registerAssist = async (barcodeValue: string) => {
    const apiUrl = 'https://node-webrest-server-fin-seccion-production.up.railway.app';

    const userId = parseInt(barcodeValue);
    if (isNaN(userId)) {
      console.log('Codigo Qr invalido, No es un Id valido')
      setIsModalOpen(true);
      setIsScanning(false);
      return;
    }

    const data = {
      userId: userId,
      fecha: new  Date().toISOString(),
    }

    try {
      const response = await fetch(`${apiUrl}/api/assist/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }); 

      const result = await response.json()
      console.log(result);
      if (response.ok) {
        setModalMessage(`Asistencia registrada correctamente\nBienvenido:\nEmpleado número ${userId}`);
        console.log("Asistencia registrada correctamente", response);
      } else {
        setModalMessage("Error al registrar asistencia");
      }
    } catch (e) {
      console.error("Error al registrar asistencia", e);
      setModalMessage("Error al registrar asistencia");
    }
    setIsModalOpen(true);
  }
  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsScanning(true);  // Reiniciar escaneo
  };

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
        }}
      />
      <div>
        <h2>Códigos de Barras Detectados:</h2>
        {/* <ul>
          {detectedBarcodes.map((barcode, index) => (
            <li key={index}>{barcode}</li>
          ))}
        </ul> */}
        <ModalScanner
          isOpen={isModalOpen}
          onClose={handleModalClose}
          message={modalMessage}
        />
      </div>
    </section>
  );
};
