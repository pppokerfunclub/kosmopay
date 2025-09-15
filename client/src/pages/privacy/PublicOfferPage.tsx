import { cn } from "@/lib";

interface Props {
  className?: string;
}

export const PublicOfferPage = ({ className }: Props) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="bg-white rounded-[24px] p-8 md:p-12">
        <h2 className="mb-8">Публичная оферта</h2>

        <div className="space-y-6">
          <section>
            <h2 className="mb-4">1. Предмет договора</h2>
            <p>
              Настоящая публичная оферта определяет условия предоставления услуг
              по продаже игровой валюты и товаров для игры PP Poker через сервис
              KosmoPay.
            </p>
          </section>

          <section>
            <h2 className="mb-4">2. Условия предоставления услуг</h2>
            <p>Исполнитель обязуется предоставить следующие услуги:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Продажа алмазов для игры PP Poker</li>
              <li>Продажа жетонов для игры PP Poker</li>
              <li>Продажа VIP-карт</li>
              <li>Техническая поддержка клиентов</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4">3. Права и обязанности сторон</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Обязанности Исполнителя:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Предоставить услуги в соответствии с договором</li>
                  <li>Обеспечить безопасность платежей</li>
                  <li>Предоставить техническую поддержку</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Обязанности Заказчика:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Предоставить корректные данные для заказа</li>
                  <li>Произвести оплату в установленные сроки</li>
                  <li>Соблюдать правила игры PP Poker</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4">4. Порядок расчетов</h2>
            <p>
              Оплата услуг производится через системы СБП и МИР. Стоимость услуг
              указывается в рублях и включает все налоги.
            </p>
          </section>

          <section>
            <h2 className="mb-4">5. Ответственность сторон</h2>
            <p>
              Исполнитель не несет ответственности за действия игроков в PP
              Poker и не может влиять на игровой процесс после зачисления
              игровой валюты.
            </p>
          </section>

          <section>
            <h2 className="mb-4">6. Контактная информация</h2>
            <p>
              По вопросам услуг обращайтесь:
              <br />
              Telegram: @kosmopay_support
              <br />
              Email: support@kosmopay.ru
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
