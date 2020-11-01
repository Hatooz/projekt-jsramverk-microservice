# projekt-jsramverk-microservice
Microservice repo for jsramverk project

# Teknik
Jag valde att implementera microservicen som en egen självständig backend. Jag tycker det blir smidigast så, så man inte blandar denna servicen med den "vanliga" backenden. Det blir då enklare att hålla reda på vad som händer vid olika tillfällen och det ger mycket bättre möjligheter vid debugging. Jag använde mig av socket.io för att implementera den här delen av projektet. Socket.io använde jag i de två sista kursmomenten och det var smidigt och lätt att använda så därför valde jag att fortsätta med det. Jag tycker tekniken funkar förvånansvärt bra, speciellt med avseende på hur lite kod som egentligen behövs för att det ska fungera. I och med att denna servicen är sin egen lilla backend så har jag driftsatt både denna och den "normala" backend. Mina vue components som då använder sig av websockets går pollar då mot denna backenden. Denna services emitar ny data var 5e sekund.
