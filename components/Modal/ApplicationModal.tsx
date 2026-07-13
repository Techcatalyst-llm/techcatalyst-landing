'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
  language?: 'en' | 'ru';
  variant?: 'default' | 'business' | 'procurement' | 'ai' | 'vpn';
}

export default function ApplicationModal({
  isOpen,
  onClose,
  source = 'unknown',
  language = 'en',
  variant = 'default',
}: ApplicationModalProps) {
  const copy = {
    default: {
      en: {
        badge: 'Launch request',
        title: 'Get started with',
        highlight: 'Tech Catalyst',
        subtitle: 'Create your free account and tell us what you want to build.',
        name: 'Name *',
        company: 'Company',
        email: 'Email *',
        telegram: 'Telegram',
        useCase: 'Use case',
        placeholder: {
          name: 'John',
          company: 'Example Inc.',
          email: 'john@example.com',
          telegram: '@username',
          useCase: 'Describe the product, expected traffic, target models or procurement constraints.',
        },
        submitting: 'Submitting...',
        submit: 'Create free account',
        success: "Application submitted. We'll contact you soon.",
        error: 'Request failed. Please try again.',
        requireCompany: false,
      },
      ru: {
        badge: 'Запрос доступа',
        title: 'Начните работу с',
        highlight: 'ТехКаталист',
        subtitle: 'Создайте бесплатный аккаунт и коротко опишите ваш сценарий использования.',
        name: 'Имя *',
        company: 'Компания',
        email: 'Эл. почта *',
        telegram: 'Telegram',
        useCase: 'Сценарий использования',
        placeholder: {
          name: 'Иван',
          company: 'ООО Пример',
          email: 'ivan@example.com',
          telegram: '@username',
          useCase: 'Опишите продукт, ожидаемую нагрузку, интересующие модели или требования закупки.',
        },
        submitting: 'Отправка...',
        submit: 'Создать бесплатный аккаунт',
        success: 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.',
        error: 'Отправка заявки прервалась. Попробуйте ещё раз.',
        requireCompany: false,
      },
    },
    business: {
      en: {
        badge: 'Business request',
        title: 'Discuss your task with',
        highlight: 'TechCatalyst',
        subtitle: 'Tell us which product, users and target result you need. We will suggest the next working step.',
        name: 'Name *',
        company: 'Company *',
        email: 'Email *',
        telegram: 'Telegram',
        useCase: 'Task *',
        placeholder: {
          name: 'John',
          company: 'Example Inc.',
          email: 'john@example.com',
          telegram: '@username',
          useCase: 'Software procurement, AI integration, developer workstation security or corporate VPN.',
        },
        submitting: 'Submitting...',
        submit: 'Send request',
        success: 'Request submitted. We will contact you shortly.',
        error: 'Request failed. Please try again.',
        requireCompany: true,
      },
      ru: {
        badge: 'Корпоративный запрос',
        title: 'Обсудить задачу с',
        highlight: 'TechCatalyst',
        subtitle: 'Укажите продукт, число пользователей и желаемый результат. Предложим следующий рабочий шаг.',
        name: 'Имя *',
        company: 'Компания *',
        email: 'Эл. почта *',
        telegram: 'Telegram',
        useCase: 'Задача *',
        placeholder: {
          name: 'Иван',
          company: 'ООО «Компания»',
          email: 'ivan@company.ru',
          telegram: '@username',
          useCase: 'Поставка ПО, интеграция ИИ, безопасное рабочее место разработчика или корпоративный VPN.',
        },
        submitting: 'Отправка...',
        submit: 'Отправить запрос',
        success: 'Запрос отправлен. Мы свяжемся с вами в ближайшее время.',
        error: 'Отправка заявки прервалась. Попробуйте ещё раз.',
        requireCompany: true,
      },
    },
    procurement: {
      en: {
        badge: 'Procurement request',
        title: 'Foreign software',
        highlight: 'procurement',
        subtitle:
          'Tell us which software you need, the license volume, timing and document requirements. We will prepare a procurement route and commercial estimate.',
        name: 'Name *',
        company: 'Company *',
        email: 'Email *',
        telegram: 'Telegram',
        useCase: 'Software and requirements *',
        placeholder: {
          name: 'John',
          company: 'Example Inc.',
          email: 'john@example.com',
          telegram: '@username',
          useCase:
            'For example: OpenAI / Claude / Microsoft 365 / Adobe, number of licenses, renewal date, contract or closing document requirements.',
        },
        submitting: 'Submitting...',
        submit: 'Request procurement estimate',
        success: 'Request submitted. We will prepare the procurement route and contact you shortly.',
        error: 'Request failed. Please try again.',
        requireCompany: true,
      },
      ru: {
        badge: 'Запрос на закупку',
        title: 'Закупка зарубежного ПО',
        highlight: 'ТехКаталист',
        subtitle:
          'Опишите нужное ПО, объём лицензий, срок и требования к документам. Мы подготовим маршрут закупки и коммерческий расчёт.',
        name: 'Имя *',
        company: 'Компания *',
        email: 'Эл. почта *',
        telegram: 'Telegram',
        useCase: 'Какое ПО и какие требования *',
        placeholder: {
          name: 'Иван',
          company: 'ООО Пример',
          email: 'ivan@example.com',
          telegram: '@username',
          useCase:
            'Например: OpenAI / Claude / Microsoft 365 / Adobe, число лицензий, дата продления, требования к договору и закрывающим документам.',
        },
        submitting: 'Отправка...',
        submit: 'Получить расчёт закупки',
        success: 'Запрос отправлен. Подготовим маршрут закупки и свяжемся с вами.',
        error: 'Отправка заявки прервалась. Попробуйте ещё раз.',
        requireCompany: true,
      },
    },
    ai: {
      en: {
        badge: 'AI delivery and integration',
        title: 'Build an AI scope with',
        highlight: 'TechCatalyst',
        subtitle: 'Describe users, target systems, providers and the business result you need.',
        name: 'Name *',
        company: 'Company *',
        email: 'Email *',
        telegram: 'Telegram',
        useCase: 'AI task *',
        placeholder: {
          name: 'John',
          company: 'Example Inc.',
          email: 'john@example.com',
          telegram: '@username',
          useCase: 'For example: 50 users, unified API, provider routing, limits and integration with an internal product.',
        },
        submitting: 'Submitting...',
        submit: 'Discuss AI project',
        success: 'Request submitted. We will contact you shortly.',
        error: 'Request failed. Please try again.',
        requireCompany: true,
      },
      ru: {
        badge: 'Поставка и интеграция ИИ',
        title: 'Собрать контур ИИ с',
        highlight: 'TechCatalyst',
        subtitle: 'Опишите пользователей, целевые системы, поставщиков и бизнес-результат.',
        name: 'Имя *',
        company: 'Компания *',
        email: 'Эл. почта *',
        telegram: 'Telegram',
        useCase: 'Задача ИИ *',
        placeholder: {
          name: 'Иван',
          company: 'ООО «Компания»',
          email: 'ivan@company.ru',
          telegram: '@username',
          useCase: 'Например: 50 пользователей, единый программный интерфейс, маршрутизация, лимиты и интеграция с внутренним продуктом.',
        },
        submitting: 'Отправка...',
        submit: 'Обсудить проект ИИ',
        success: 'Запрос отправлен. Мы свяжемся с вами в ближайшее время.',
        error: 'Отправка заявки прервалась. Попробуйте ещё раз.',
        requireCompany: true,
      },
    },
    vpn: {
      en: {
        badge: 'Corporate VPN',
        title: 'Select a VPN scope with',
        highlight: 'TechCatalyst',
        subtitle: 'Tell us the user count, devices, locations, egress IP and administration model.',
        name: 'Name *',
        company: 'Company *',
        email: 'Email *',
        telegram: 'Telegram',
        useCase: 'VPN requirements *',
        placeholder: {
          name: 'John',
          company: 'Example Inc.',
          email: 'john@example.com',
          telegram: '@username',
          useCase: 'For example: 80 users, managed VPN, dedicated egress IP, macOS and Windows.',
        },
        submitting: 'Submitting...',
        submit: 'Request VPN scope',
        success: 'Request submitted. We will contact you shortly.',
        error: 'Request failed. Please try again.',
        requireCompany: true,
      },
      ru: {
        badge: 'Корпоративный VPN',
        title: 'Подобрать VPN-контур с',
        highlight: 'TechCatalyst',
        subtitle: 'Укажите число пользователей, устройства, географию, выходной IP-адрес и модель администрирования.',
        name: 'Имя *',
        company: 'Компания *',
        email: 'Эл. почта *',
        telegram: 'Telegram',
        useCase: 'Требования к VPN *',
        placeholder: {
          name: 'Иван',
          company: 'ООО «Компания»',
          email: 'ivan@company.ru',
          telegram: '@username',
          useCase: 'Например: 80 пользователей, управляемый VPN, выделенный выходной IP-адрес, macOS и Windows.',
        },
        submitting: 'Отправка...',
        submit: 'Получить схему VPN',
        success: 'Запрос отправлен. Мы свяжемся с вами в ближайшее время.',
        error: 'Отправка заявки прервалась. Попробуйте ещё раз.',
        requireCompany: true,
      },
    },
  };

  const translations = copy[variant][language];
  const [formData, setFormData] = useState({
    firstName: '',
    company: '',
    email: '',
    telegram: '',
    mvpDescription: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source, type: variant }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => {
          setFormData({
            firstName: '',
            company: '',
            email: '',
            telegram: '',
            mvpDescription: '',
          });
          setSubmitStatus('idle');
          onClose();
        }, 1600);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans" style={{ fontFeatureSettings: '"ss03"' }}>
      <div className="absolute inset-0 bg-[rgba(28,29,31,.42)] backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-[560px] rounded-[8px] border border-[#e4e8f4] bg-white p-6 sm:p-7"
        style={{
          boxShadow: 'rgba(28, 40, 64, 0.1) 0px 2px 3px -2px, rgba(28, 40, 64, 0.04) 0px 4px 6px -2px',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex rounded-[10px] border border-[#ccd5ea] bg-white p-2 text-[#565e78] transition-colors hover:bg-[#eef1f8] hover:text-[#0d1326]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 pr-10">
          <div className="mb-3 text-[12px] font-medium uppercase tracking-[0.08em] text-[#4c6bff]">{translations.badge}</div>
          <h3
            className="text-[28px] font-medium leading-[1.23] tracking-[-0.42px] text-[#0d1326]"
            style={{ fontFeatureSettings: '"ss03"' }}
          >
            {translations.title} <span>{translations.highlight}</span>
          </h3>
          <p className="mt-3 text-[14px] leading-[1.43] tracking-[-0.14px] text-[#565e78]">{translations.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="mb-1.5 block text-[14px] font-medium text-[#0d1326]">
              {translations.name}
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full rounded-[7px] border border-[#ccd5ea] bg-white px-3 py-3 text-[14px] text-[#0d1326] outline-none transition-colors focus:border-[#94a8ff] focus:ring-0"
              placeholder={translations.placeholder.name}
            />
          </div>

          <div>
            <label htmlFor="company" className="mb-1.5 block text-[14px] font-medium text-[#0d1326]">
              {translations.company}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required={translations.requireCompany}
              className="w-full rounded-[7px] border border-[#ccd5ea] bg-white px-3 py-3 text-[14px] text-[#0d1326] outline-none transition-colors focus:border-[#94a8ff] focus:ring-0"
              placeholder={translations.placeholder.company}
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-[14px] font-medium text-[#0d1326]">
              {translations.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-[7px] border border-[#ccd5ea] bg-white px-3 py-3 text-[14px] text-[#0d1326] outline-none transition-colors focus:border-[#94a8ff] focus:ring-0"
              placeholder={translations.placeholder.email}
            />
          </div>

          <div>
            <label htmlFor="telegram" className="mb-1.5 block text-[14px] font-medium text-[#0d1326]">
              {translations.telegram}
            </label>
            <input
              type="text"
              id="telegram"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              className="w-full rounded-[7px] border border-[#ccd5ea] bg-white px-3 py-3 text-[14px] text-[#0d1326] outline-none transition-colors focus:border-[#94a8ff] focus:ring-0"
              placeholder={translations.placeholder.telegram}
            />
          </div>

          <div>
            <label htmlFor="mvpDescription" className="mb-1.5 block text-[14px] font-medium text-[#0d1326]">
              {translations.useCase}
            </label>
            <textarea
              id="mvpDescription"
              name="mvpDescription"
              value={formData.mvpDescription}
              onChange={handleChange}
              rows={4}
              required={variant === 'procurement'}
              className="w-full resize-none rounded-[7px] border border-[#ccd5ea] bg-white px-3 py-3 text-[14px] text-[#0d1326] outline-none transition-colors focus:border-[#94a8ff] focus:ring-0"
              placeholder={translations.placeholder.useCase}
            />
          </div>

          {submitStatus === 'success' ? (
            <div className="rounded-[8px] border border-[#ccd5ea] bg-[#eef1f8] px-4 py-3 text-[14px] text-[#075a39]">
              {translations.success}
            </div>
          ) : null}

          {submitStatus === 'error' ? (
            <div className="rounded-[8px] border border-[#ccd5ea] bg-[#eef1f8] px-4 py-3 text-[14px] text-[#772322]">
              {translations.error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-[10px] border border-[#0d1326] bg-[#0d1326] px-4 py-3 text-[14px] font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:border-[#aab3c8] disabled:bg-[#aab3c8]"
          >
            {isSubmitting ? translations.submitting : translations.submit}
          </button>

          <p className="text-center text-[12px] leading-[1.5] tracking-[-0.14px] text-[#8d93ab]">
            {language === 'ru' ? (
              <>
                Нажимая кнопку, вы соглашаетесь с{' '}
                <Link href="/privacy" className="text-[#4c6bff] hover:text-[#0d1326]">
                  политикой конфиденциальности
                </Link>{' '}
                и{' '}
                <Link href="/cookie" className="text-[#4c6bff] hover:text-[#0d1326]">
                  политикой cookie
                </Link>
                .
              </>
            ) : (
              <>
                By clicking the button, you agree to the{' '}
                <Link href="/privacy" className="text-[#4c6bff] hover:text-[#0d1326]">
                  privacy policy
                </Link>{' '}
                and{' '}
                <Link href="/cookie" className="text-[#4c6bff] hover:text-[#0d1326]">
                  cookie policy
                </Link>
                .
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
