-- Data migration: image URLs moved from Yandex Object Storage to Selectel.
-- https://storage.yandexcloud.net/parus-ritual/<key> -> https://d5aa363e-a26b-4d65-8310-b63e26f43c43.selstorage.ru/<key>

UPDATE "Product"
SET "thumbnail" = replace("thumbnail", 'https://storage.yandexcloud.net/parus-ritual/', 'https://d5aa363e-a26b-4d65-8310-b63e26f43c43.selstorage.ru/'),
    "images" = ARRAY(
        SELECT replace(x, 'https://storage.yandexcloud.net/parus-ritual/', 'https://d5aa363e-a26b-4d65-8310-b63e26f43c43.selstorage.ru/')
        FROM unnest("images") WITH ORDINALITY AS t(x, ord)
        ORDER BY ord
    )
WHERE "thumbnail" LIKE '%storage.yandexcloud.net/parus-ritual/%'
   OR array_to_string("images", ' ') LIKE '%storage.yandexcloud.net/parus-ritual/%';

UPDATE "Service"
SET "thumbnail" = replace("thumbnail", 'https://storage.yandexcloud.net/parus-ritual/', 'https://d5aa363e-a26b-4d65-8310-b63e26f43c43.selstorage.ru/'),
    "images" = ARRAY(
        SELECT replace(x, 'https://storage.yandexcloud.net/parus-ritual/', 'https://d5aa363e-a26b-4d65-8310-b63e26f43c43.selstorage.ru/')
        FROM unnest("images") WITH ORDINALITY AS t(x, ord)
        ORDER BY ord
    )
WHERE "thumbnail" LIKE '%storage.yandexcloud.net/parus-ritual/%'
   OR array_to_string("images", ' ') LIKE '%storage.yandexcloud.net/parus-ritual/%';

UPDATE "Address"
SET "cemeteryThumbnail" = replace("cemeteryThumbnail", 'https://storage.yandexcloud.net/parus-ritual/', 'https://d5aa363e-a26b-4d65-8310-b63e26f43c43.selstorage.ru/'),
    "cemeteryImages" = ARRAY(
        SELECT replace(x, 'https://storage.yandexcloud.net/parus-ritual/', 'https://d5aa363e-a26b-4d65-8310-b63e26f43c43.selstorage.ru/')
        FROM unnest("cemeteryImages") WITH ORDINALITY AS t(x, ord)
        ORDER BY ord
    )
WHERE "cemeteryThumbnail" LIKE '%storage.yandexcloud.net/parus-ritual/%'
   OR array_to_string("cemeteryImages", ' ') LIKE '%storage.yandexcloud.net/parus-ritual/%';

UPDATE "LandingPage"
SET "data" = replace("data"::text, 'https://storage.yandexcloud.net/parus-ritual/', 'https://d5aa363e-a26b-4d65-8310-b63e26f43c43.selstorage.ru/')::jsonb
WHERE "data"::text LIKE '%storage.yandexcloud.net/parus-ritual/%';
