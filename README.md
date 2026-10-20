Архитектура:
  - public
    - ... ресурсы проекта
  - src
    - api
      - ... все обращения к backend
    - common
      - ... общие списки, классы, коллекции и т.д.
    - components
      - ... атомарная структура компонентов
    - controller
      - ... контроллеры страницы
    - hooks
      - ... хуки
    - i18n
      - ... локализация
    - interfaces
      - ... общие интерфейсы
    - provider
      - ... контексты
    - util
      - ...

Стек:
  - Frontend
    - Vite React TS
    - Node.JS (v22.15.0)

  - Backend: 
    - ASP .NET Core 9

  - БД:
    - PostgreSQL

Запуск:
  - Загрузить необходимые образы (Docker Image):
    - samo-api-web (фронт)
    - samo-api-backend
    - postgresql
  - Запустить контейнеры данных образов

Доступные пути:
  - /home - главная страница
  - /diary - дневник
  - /objectives - цели
  - /lists - списки
  - /signin - страница входа
  - /signup - страница регистрации

.env переменные:
  Используются следующие vite-переменные окружения:
    - VITE_API_URL - адрес API проекта (dev & prod)
    - VITE_NO_AUTH_MODE - позволяет выключить проверку авторизации на сайте (рекомндуется только для вёрстки) (по умолчанию: false) (dev)