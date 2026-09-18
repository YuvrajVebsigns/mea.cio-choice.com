'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, ChevronDown, Clock3, MapPin, Plus } from 'lucide-react';
import { useState } from 'react';

const galleryImages = ['MIDDLE-EAST.jpg'];

const eventDetails = {
  title: 'MEA CIO Choice 2027',
  date: 'January 28, 2027',
  time: '16:30 hrs',
  location: 'Coming Soon',
  calendarDate: '20270128T163000',
};

function downloadCalendarEvent() {
  const calendar = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MEA CIO Choice//Event Schedule//EN',
    'BEGIN:VEVENT',
    `DTSTART:${eventDetails.calendarDate}`,
    'DTEND:20270128T183000',
    `SUMMARY:${eventDetails.title}`,
    `LOCATION:${eventDetails.location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const blob = new Blob([calendar], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'mea-cio-choice-2027.ics';
  link.click();
  URL.revokeObjectURL(url);
}

export default function EventScheduleSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="home-schedule" aria-labelledby="event-schedule-title">
      <div className="home-schedule-container">
        <Link
          href="/gallery/photo-gallery/2026"
          className="home-schedule-gallery"
          aria-label="View the CIO Choice event gallery"
        >
          {galleryImages.map((image) => (
            <Image
              key={image}
              src={`/assets/logo/${image}`}
              alt="CIO Choice event highlight"
              width={1920}
              height={365}
              className="home-schedule-gallery-image"
            />
          ))}
          {/* <span className="home-schedule-gallery-label">View event highlights</span> */}
        </Link>

        <div className={`home-schedule-content ${isExpanded ? 'is-expanded' : ''}`}>
          <p className="home-schedule-eyebrow">MEA CIO CHOICE 2027</p>
          <h2 id="event-schedule-title">Event Schedule</h2>
          <div className="home-schedule-divider" aria-hidden="true">
            <span />
          </div>

          <button
            type="button"
            className="home-schedule-card"
            onClick={() => setIsExpanded((expanded) => !expanded)}
            aria-expanded={isExpanded}
          >
            <div className="home-schedule-card-row">
              <CalendarDays size={18} aria-hidden="true" />
              <span>{eventDetails.date}</span>
            </div>
            <div className="home-schedule-card-row">
              <Clock3 size={18} aria-hidden="true" />
              <span>{eventDetails.time}</span>
            </div>
            <div className="home-schedule-card-row">
              <MapPin size={18} aria-hidden="true" />
              <span>{eventDetails.location}</span>
            </div>
            <ChevronDown className="home-schedule-card-chevron" size={19} aria-hidden="true" />
          </button>

          <div className="home-schedule-details" aria-hidden={!isExpanded}>
            <p>
              Join technology leaders for an evening celebrating the brands shaping enterprise
              innovation.
            </p>
            <button
              type="button"
              className="home-schedule-calendar-button"
              onClick={downloadCalendarEvent}
            >
              <Plus size={17} aria-hidden="true" />
              Add to calendar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
