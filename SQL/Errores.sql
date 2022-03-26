USE ADMIN_ACADEMIAS
GO
EXEC sp_addmessage 50001, 11, 'Nómina o clave incorrecta', 'us_english', @replace='replace';
EXEC sp_addmessage 50002, 11, 'La nómina ya se encuentra registrada', 'us_english', @replace='replace';
EXEC sp_addmessage 50003, 11, 'La cuenta se encuentra suspendida, consulte con su coordinador', 'us_english', @replace='replace';
EXEC sp_addmessage 50004, 11, 'La clave de la carrera ya se encuentra en uso', 'us_english', @replace='replace';
GO