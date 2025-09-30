/**
 * 이미지 압축 유틸리티 함수
 * 모든 이미지 업로드에서 사용할 수 있는 공용 모듈
 */

interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'image/jpeg' | 'image/png' | 'image/webp';
}

/**
 * 이미지를 압축하고 크기를 조절하는 함수
 * @param file - 압축할 이미지 파일
 * @param options - 압축 옵션
 * @returns 압축된 이미지 파일
 */
export const compressImage = (
  file: File,
  options: CompressionOptions = {}
): Promise<File> => {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.8,
    format = 'image/jpeg'
  } = options;

  return new Promise((resolve, reject) => {
    // 지원하지 않는 파일 타입 체크
    if (!file.type.startsWith('image/')) {
      reject(new Error('이미지 파일만 업로드 가능합니다.'));
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      try {
        // 원본 이미지 크기
        let { width, height } = img;

        // 최대 크기에 맞게 비율 유지하면서 리사이즈
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        // 캔버스 크기 설정
        canvas.width = width;
        canvas.height = height;

        // 이미지 그리기
        ctx?.drawImage(img, 0, 0, width, height);

        // 지정된 포맷으로 압축하여 Blob 생성
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // 새로운 File 객체 생성
              const compressedFile = new File([blob], file.name, {
                type: format,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('이미지 압축에 실패했습니다.'));
            }
          },
          format,
          quality
        );
      } catch (error) {
        reject(new Error('이미지 처리 중 오류가 발생했습니다.'));
      }
    };

    img.onerror = () => {
      reject(new Error('이미지 로드에 실패했습니다.'));
    };

    // 파일을 이미지로 로드
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('파일 읽기에 실패했습니다.'));
    };
    reader.readAsDataURL(file);
  });
};

/**
 * 게시물용 이미지 압축 (중간 크기, 중간 품질)
 */
export const compressImageForPost = (file: File): Promise<File> => {
  return compressImage(file, {
    maxWidth: 1200,
    maxHeight: 800,
    quality: 0.6,
    format: 'image/jpeg'
  });
};

/**
 * 프로필 사진용 이미지 압축 (작은 크기, 낮은 품질)
 */
export const compressImageForProfile = (file: File): Promise<File> => {
  return compressImage(file, {
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.5,
    format: 'image/jpeg'
  });
};

/**
 * 썸네일용 이미지 압축 (작은 크기, 낮은 품질)
 */
export const compressImageForThumbnail = (file: File): Promise<File> => {
  return compressImage(file, {
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.6,
    format: 'image/jpeg'
  });
};

/**
 * AddArea용 이미지 압축 (작은 크기, 낮은 품질)
 */
export const compressImageForArea = (file: File): Promise<File> => {
  return compressImage(file, {
    maxWidth: 600,
    maxHeight: 600,
    quality: 0.5,
    format: 'image/jpeg'
  });
};
