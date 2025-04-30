import styles from './testimonials.module.css';

const Testimonials = ({ testimonials }) => {
  return (
    <div className={styles.testimonialCarousel}>
      {testimonials.map((testimonial, index) => (
        <div key={index} className={styles.testimonialItem}>
          <p className={styles.testimonialText}>"{testimonial.text}"</p>
          <p className={styles.testimonialAuthor}>– {testimonial.author}</p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
