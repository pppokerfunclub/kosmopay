import { cn } from "@/lib";

interface Props {
  className?: string;
}

export const DisclaimerPage = ({ className }: Props) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="bg-white rounded-[24px] p-8 md:p-12">
        <h2 className="mb-8">Отказ от ответственности</h2>

        <div className="space-y-6">
          <section>
            <h2 className="mb-4">1. Общие положения</h2>
            <p>
              Настоящий документ содержит отказ от ответственности сервиса
              KosmoPay за определенные действия и обстоятельства, связанные с
              предоставлением услуг.
            </p>
          </section>

          <section>
            <h2 className="mb-4">2. Ограничения ответственности</h2>
            <p>Сервис KosmoPay не несет ответственности за:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>
                Действия игроков в PP Poker после получения игровой валюты
              </li>
              <li>Блокировку аккаунтов игроков администрацией PP Poker</li>
              <li>Изменения в правилах игры PP Poker</li>
              <li>Технические сбои в работе PP Poker</li>
              <li>Потерю игровой валюты по вине игрока</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4">3. Условия предоставления услуг</h2>
            <p>Услуги предоставляются "как есть". Мы не гарантируем:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Бесперебойную работу PP Poker</li>
              <li>Отсутствие изменений в правилах игры</li>
              <li>Сохранность игрового аккаунта</li>
              <li>Возврат средств при нарушении правил игры</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4">4. Обязанности клиента</h2>
            <p>Клиент обязуется:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Соблюдать правила игры PP Poker</li>
              <li>Не использовать читы и другие запрещенные программы</li>
              <li>Предоставлять корректные данные для заказа</li>
              <li>Не нарушать пользовательское соглашение PP Poker</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4">5. Возврат средств</h2>
            <p>Возврат средств возможен только в следующих случаях:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Техническая ошибка на стороне сервиса</li>
              <li>Незачисление игровой валюты в течение 24 часов</li>
              <li>Дублирование платежа</li>
            </ul>
            <p className="mt-4">
              Возврат средств при нарушении правил игры или блокировке аккаунта
              не производится.
            </p>
          </section>

          <section>
            <h2 className="mb-4">6. Контактная информация</h2>
            <p>
              По вопросам отзыва от ответственности обращайтесь:
              <br />
              Telegram: @kosmopay_support
              <br />
              Email: legal@kosmopay.ru
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
