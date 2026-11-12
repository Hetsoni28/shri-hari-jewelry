import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { CatalogProduct } from '../molecules/DownloadPdfButton';

// Register Gujarati fonts for proper rendering of the brand name
Font.register({
  family: 'NotoGujarati',
  src: '/fonts/NotoSansGujarati-Regular.ttf'
});
Font.register({
  family: 'NotoGujarati-Bold',
  src: '/fonts/NotoSansGujarati-Bold.ttf'
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FDFAFF',
    padding: 40,
    paddingBottom: 65,         // extra space so grid never overlaps the absolute footer
    fontFamily: 'Helvetica',
  },
  coverPage: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    position: 'relative',
    height: '100%',
  },
  // Double border effect
  outerBorder: {
    position: 'absolute',
    top: 25,
    bottom: 25,
    left: 25,
    right: 25,
    borderWidth: 1,
    borderColor: '#D4AF37',
  },
  innerBorder: {
    position: 'absolute',
    top: 30,
    bottom: 30,
    left: 30,
    right: 30,
    borderWidth: 0.5,
    borderColor: '#D4AF37',
    opacity: 0.7,
  },
  // Content Wrapper
  coverContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  // Top Branding
  topBranding: {
    alignItems: 'center',
    marginBottom: 30,
  },
  brandNameGujarati: {
    fontFamily: 'NotoGujarati-Bold',
    fontSize: 26,
    color: '#111111',
    marginBottom: 6,
  },
  brandNameEnglish: {
    fontFamily: 'Times-Roman',
    fontSize: 14,
    color: '#111111',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  brandNameTagline: {
    fontFamily: 'NotoGujarati-Bold',
    fontSize: 10,
    color: '#B8860B',
  },
  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    width: '100%',
  },
  dividerLine: {
    height: 0.5,
    backgroundColor: '#D4AF37',
    width: 40,
    marginHorizontal: 10,
  },
  dividerDiamond: {
    width: 4,
    height: 4,
    backgroundColor: '#D4AF37',
    transform: 'rotate(45deg)',
  },
  // Title Box
  titleBox: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 36,
    paddingHorizontal: 36,
    alignItems: 'center',
    width: '95%',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderBottomWidth: 3,
    borderBottomColor: '#F5F5F5',
  },
  coverTitle: {
    fontSize: 22,
    color: '#111111',
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 14,
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 10,
    color: '#B8860B',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
  // Bottom Footer
  bottomFooter: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerLine: {
    height: 0.5,
    backgroundColor: '#D4AF37',
    width: 60,
    marginBottom: 16,
  },
  footerMainText: {
    fontSize: 10,
    color: '#1A1A1A',
    fontFamily: 'Times-Bold',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  footerSubText: {
    fontSize: 8,
    color: '#888888',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  // --- Inner Pages Styles ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#D4AF37',
    paddingBottom: 10,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 10,
    color: '#1A1A1A',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontFamily: 'Times-Bold',
  },
  headerTextGujarati: {
    fontSize: 12,
    color: '#1A1A1A',
    fontFamily: 'NotoGujarati-Bold',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: 16,          // reduced so 2 rows fit on one A4 page
    backgroundColor: '#FFFFFF',
    border: '1pt solid #F0F0F0',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 250,               // tuned for 2×2 grid on A4
    objectFit: 'contain',      // full image — never crops necklaces
    backgroundColor: '#FAFAFA',
  },
  productCardText: {
    padding: 10,
    paddingTop: 8,
  },
  productCategory: {
    fontSize: 8,
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 11,
    color: '#111111',
    fontFamily: 'Times-Bold',
    marginBottom: 4,
  },
  footerInner: {
    position: 'absolute',
    bottom: 25,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 8,
  },
  footerInnerText: {
    fontSize: 8,
    color: '#555555',
    letterSpacing: 1,
  }
});

interface CatalogDocumentProps {
  title: string;
  subtitle: string;
  products: CatalogProduct[];
}

export default function CatalogDocument({ title, subtitle, products }: CatalogDocumentProps) {
  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        {/* Ornate Double Border */}
        <View style={styles.outerBorder}></View>
        <View style={styles.innerBorder}></View>

        <View style={styles.coverContent}>
          
          {/* Top Brand Name */}
          <View style={styles.topBranding}>
            <Text style={styles.brandNameGujarati}>શ્રી હરિ જ્વેલર્સ</Text>
            <Text style={styles.brandNameEnglish}>SHREE HARI JEWELLERS</Text>
            <Text style={styles.brandNameTagline}>પાદરાવાળા</Text>
          </View>

          {/* Elegant Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine}></View>
            <View style={styles.dividerDiamond}></View>
            <View style={styles.dividerLine}></View>
          </View>

          {/* Title Box */}
          <View style={styles.titleBox}>
            <Text style={styles.coverTitle}>{title}</Text>
            <Text style={styles.coverSubtitle}>{subtitle}</Text>
          </View>

          {/* Spacer to push footer down */}
          <View style={{ flex: 1 }}></View>

          {/* Bottom Footer Info */}
          <View style={styles.bottomFooter}>
            <View style={styles.footerLine}></View>
            <Text style={styles.footerMainText}>RETAIL CATALOG</Text>
            <Text style={styles.footerSubText}>PRIVATE & CONFIDENTIAL</Text>
          </View>

        </View>
      </Page>

      {/* Product Pages — exactly 4 per page (2 columns × 2 rows) */}
      {Array.from({ length: Math.ceil(products.length / 4) }, (_, pageIdx) => {
        const pageProducts = products.slice(pageIdx * 4, pageIdx * 4 + 4);
        return (
          <Page key={pageIdx} size="A4" style={styles.page}>
            {/* Page Header */}
            <View style={styles.header}>
              <Text style={styles.headerText}>{title}</Text>
              <Text style={styles.headerText}>SHRI HARI JEWELLERS</Text>
            </View>

            {/* 2×2 product grid */}
            <View style={styles.grid}>
              {pageProducts.map((product) => {
                // Only render <Image> when proxy returned valid base64
                // Raw URLs can silently fail in react-pdf → blank white box
                const hasValidImage =
                  typeof product.imageSrc === 'string' &&
                  product.imageSrc.startsWith('data:');
                return (
                  <View style={styles.productCard} key={product.id}>
                    {hasValidImage ? (
                      <Image src={product.imageSrc} style={styles.productImage} />
                    ) : (
                      <View
                        style={[
                          styles.productImage,
                          { backgroundColor: '#F5F0E8', alignItems: 'center', justifyContent: 'center' },
                        ]}
                      >
                        <Text style={{ fontSize: 9, color: '#B8860B', textAlign: 'center', letterSpacing: 1 }}>
                          IMAGE{`\n`}LOADING
                        </Text>
                      </View>
                    )}
                    <View style={styles.productCardText}>
                      <Text style={styles.productCategory}>{product.subcategory} {product.category}</Text>
                      <Text style={styles.productTitle}>{product.title}</Text>
                    </View>
                  </View>
                );
              })}
              {/* Phantom card to keep 2-col alignment when odd count on last page */}
              {pageProducts.length % 2 !== 0 && (
                <View style={[styles.productCard, { backgroundColor: 'transparent', borderColor: 'transparent' }]} />
              )}
            </View>

            {/* Page Footer */}
            <View style={styles.footerInner}>
              <Text style={styles.footerInnerText}>WhatsApp: +91 99781 01081</Text>
              <Text style={styles.footerInnerText}>www.shriharijewellers.com</Text>
            </View>
          </Page>
        );
      })}
    </Document>
  );
}
