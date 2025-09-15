import { cn } from "@/lib";

interface Props {
  className?: string;
}

export const PrivacyPolicyPage = ({ className }: Props) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="bg-white rounded-[24px] p-8 md:p-12">
        <h2 className="mb-8">Политика конфиденциальности</h2>

        <div className="space-y-6">
          <section>
            <h2 className="mb-4">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки
              персональных данных пользователей сервиса KosmoPay. Мы серьезно
              относимся к защите ваших персональных данных и соблюдаем все
              требования законодательства РФ.
            </p>
          </section>

          <section>
            <h2 className="mb-4">2. Сбор персональных данных</h2>
            <p>Мы собираем следующие категории персональных данных:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Идентификационные данные (PP user ID)</li>
              <li>Контактные данные (email)</li>
              <li>Данные о транзакциях</li>
              <li>Технические данные (IP-адрес, браузер)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4">3. Использование данных</h2>
            <p>Персональные данные используются для:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Обработки платежей и транзакций</li>
              <li>Предоставления услуг клиентам</li>
              <li>Связи с клиентами</li>
              <li>Улучшения качества сервиса</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4">4. Защита данных</h2>
            <p>
              Мы применяем современные технические и организационные меры для
              защиты ваших персональных данных от несанкционированного доступа,
              изменения, раскрытия или уничтожения.
            </p>
          </section>

          <section>
            <h2 className="mb-4">5. Контактная информация</h2>
            <p>
              По вопросам обработки персональных данных обращайтесь:
              <br />
              Email: privacy@kosmopay.ru
              <br />
              Telegram: @kosmopay_support
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
