function ShowImage (texte: string) {
    leds = texte.split(" ")
    ledsBin = [
    1,
    2,
    4,
    8,
    16
    ]
    for (let y = 0; y <= 4; y++) {
        val = parseInt(leds[y])
        for (let x = 0; x <= 4; x++) {
            if (val & ledsBin[x]) {
                led.plot(x, y)
            } else {
                led.unplot(x, y)
            }
        }
    }
}
input.onSound(DetectedSound.Loud, function () {
    bluetooth.uartWriteLine("c" + " " + input.soundLevel())
})
bluetooth.onBluetoothConnected(function () {
    music.playTone(440, music.beat(BeatFraction.Half))
    music.playTone(880, music.beat(BeatFraction.Half))
})
bluetooth.onBluetoothDisconnected(function () {
    music.playTone(880, music.beat(BeatFraction.Half))
    music.playTone(440, music.beat(BeatFraction.Half))
})
function readData (command: string, param: string) {
    if ("w" == command) {
        basic.showString(param)
    } else if ("l" == command) {
        ShowImage(param)
    } else if ("b" == command) {
        music.playTone(parseFloat(param), music.beat(BeatFraction.Whole))
    } else if ("m" == command) {
        mval = parseFloat(param)
        if (mval == 0) {
            music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
        } else if (mval == 1) {
            music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
        } else if (mval == 2) {
            music.startMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once)
        } else if (mval == 3) {
            music.startMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once)
        } else if (mval == 4) {
            music.startMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once)
        } else if (mval == 5) {
            music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
        } else if (mval == 6) {
            music.startMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once)
        } else if (mval == 7) {
            music.startMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once)
        } else if (mval == 8) {
            music.startMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once)
        } else if (mval == 9) {
            music.startMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once)
        } else if (mval == 10) {
            music.startMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once)
        } else if (mval == 11) {
            music.startMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once)
        } else if (mval == 12) {
            music.startMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once)
        } else if (mval == 13) {
            music.startMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once)
        } else if (mval == 14) {
            music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
        } else if (mval == 15) {
            music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once)
        } else if (mval == 16) {
            music.startMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once)
        } else if (mval == 17) {
            music.startMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once)
        } else if (mval == 18) {
            music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
        } else if (mval == 19) {
            music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
        }
    } else if ("h" == command) {
        bluetooth.uartWriteLine("microbit")
        music.playTone(440, music.beat(BeatFraction.Half))
    } else if ("p0" == command) {
        p0 = 1
        pins.digitalWritePin(DigitalPin.P0, parseFloat(param))
    } else if ("p1" == command) {
        p1 = 1
        pins.digitalWritePin(DigitalPin.P1, parseFloat(param))
    } else if ("p2" == command) {
        p2 = 1
        pins.digitalWritePin(DigitalPin.P2, parseFloat(param))
    }
}
function sendBleData () {
    bluetooth.uartWriteLine("a" + " " + input.acceleration(Dimension.X) + " " + input.acceleration(Dimension.Y) + " " + input.acceleration(Dimension.Z) + " " + input.acceleration(Dimension.Strength))
    bluetooth.uartWriteLine("r" + " " + input.rotation(Rotation.Pitch) + " " + input.compassHeading() + " " + input.rotation(Rotation.Roll))
    bluetooth.uartWriteLine("s" + " " + input.temperature() + " " + input.lightLevel() + " " + input.soundLevel())
    bluetooth.uartWriteLine("p" + " " + ((p0) ? 0 : pins.digitalReadPin(DigitalPin.P0)) + " " + ((p1) ? 0 : pins.digitalReadPin(DigitalPin.P1)) + " " + ((p2) ? 0 : pins.digitalReadPin(DigitalPin.P2)))
    if (input.buttonIsPressed(Button.A)) {
        bluetooth.uartWriteValue("b.A", 1)
    } else {
        bluetooth.uartWriteValue("b.A", 0)
    }
    if (input.buttonIsPressed(Button.B)) {
        bluetooth.uartWriteValue("b.B", 1)
    } else {
        bluetooth.uartWriteValue("b.B", 0)
    }
    if (input.logoIsPressed()) {
        bluetooth.uartWriteValue("b.L", 1)
    } else {
        bluetooth.uartWriteValue("b.L", 0)
    }
    if (input.isGesture(Gesture.Shake)) {
        bluetooth.uartWriteValue("shake", 1)
    } else {
        bluetooth.uartWriteValue("shake", 0)
    }
    if (input.isGesture(Gesture.LogoUp)) {
        bluetooth.uartWriteValue("d.x", 1)
    } else {
        if (input.isGesture(Gesture.LogoDown)) {
            bluetooth.uartWriteValue("d.x", -1)
        } else {
            bluetooth.uartWriteValue("d.x", 0)
        }
    }
    if (input.isGesture(Gesture.TiltLeft)) {
        bluetooth.uartWriteValue("d.y", -1)
    } else {
        if (input.isGesture(Gesture.TiltRight)) {
            bluetooth.uartWriteValue("d.y", 1)
        } else {
            bluetooth.uartWriteValue("d.y", 0)
        }
    }
}
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    command = bluetooth.uartReadUntil(serial.delimiters(Delimiters.SemiColon))
    param = bluetooth.uartReadUntil(serial.delimiters(Delimiters.CarriageReturn))
    readData(command, param)
    command = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
})
let param = ""
let command = ""
let mval = 0
let leds: string[] = []
let val = 0
let ledsBin: number[] = []
let p2 = 0
let p1 = 0
let p0 = 0
input.setAccelerometerRange(AcceleratorRange.TwoG)
bluetooth.startUartService()
serial.setBaudRate(BaudRate.BaudRate115200)
p0 = 0
p1 = 0
p2 = 0
bluetooth.uartWriteLine("Started")
basic.showString("OS3D")
music.playTone(440, music.beat(BeatFraction.Half))
music.playTone(880, music.beat(BeatFraction.Half))
// ShowImage("0 1 0 1 0 0 1 0 1 0 0 1 0 1 0 0 1 0 1 0 0 1 0 1 0")
basic.forever(function () {
    sendBleData()
    basic.pause(33)
})
