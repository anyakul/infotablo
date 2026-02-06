ALTER TABLE dates AUTO_INCREMENT = 1;
ALTER TABLE times AUTO_INCREMENT = 1;
ALTER TABLE files AUTO_INCREMENT = 1;

INSERT INTO dates (dates)
SELECT DATE_ADD('2026-02-07', INTERVAL n DAY) AS dt
FROM (
  SELECT a.n + b.n*10 + c.n*100 AS n
  FROM (
    SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
  ) AS a
  CROSS JOIN (
    SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
  ) AS b
  CROSS JOIN (
    SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
  ) AS c
) AS numbers
WHERE DATE_ADD('2026-02-07', INTERVAL n DAY) <= '2026-12-31';


INSERT INTO times (date_id, time_from, time_to)
SELECT d.id, v.time_from, v.time_to
FROM dates d
CROSS JOIN (
	SELECT 7 AS time_from, 8 AS time_to
	UNION ALL
	SELECT 8, 12
	UNION ALL
	SELECT 12, 13
	UNION ALL
	SELECT 13, 17
	UNION ALL
	SELECT 17, 18
) AS v;

-- Добавляем файлы и их типы для каждого временного интервала
INSERT INTO files (files, time_id, types)
SELECT 
  CASE 
    WHEN time_from = 7 THEN '01.png'
    WHEN time_from = 8 THEN '02.png'
    WHEN time_from = 12 THEN '03.mp4'
    WHEN time_from = 13 THEN '02.png'
    ELSE '05.mp4'
  END AS file_name,
  t.id AS time_id,
  CASE 
    WHEN CASE 
          WHEN time_from = 7 THEN '01.png'
          WHEN time_from = 8 THEN '02.png'
          WHEN time_from = 12 THEN '03.mp4'
          WHEN time_from = 13 THEN '02.png'
          ELSE '05.mp4'
        END LIKE '%.jpg' OR 
        CASE 
          WHEN time_from = 7 THEN '01.png'
          WHEN time_from = 8 THEN '02.png'
          WHEN time_from = 12 THEN '03.mp4'
          WHEN time_from = 13 THEN '02.png'
          ELSE '05.mp4'
        END LIKE '%.jpeg' OR 
        CASE 
          WHEN time_from = 7 THEN '01.png'
          WHEN time_from = 8 THEN '02.png'
          WHEN time_from = 12 THEN '03.mp4'
          WHEN time_from = 13 THEN '02.png'
          ELSE '05.mp4'
        END LIKE '%.png' OR 
        CASE 
          WHEN time_from = 7 THEN '01.png'
          WHEN time_from = 8 THEN '02.png'
          WHEN time_from = 12 THEN '03.mp4'
          WHEN time_from = 13 THEN '02.png'
          ELSE '05.mp4'
        END LIKE '%.svg' OR 
        CASE 
          WHEN time_from = 7 THEN '01.png'
          WHEN time_from = 8 THEN '02.png'
          WHEN time_from = 12 THEN '03.mp4'
          WHEN time_from = 13 THEN '02.png'
          ELSE '05.mp4'
        END LIKE '%.webp' THEN 'image'
    ELSE 'video'
  END AS types
FROM times t;
