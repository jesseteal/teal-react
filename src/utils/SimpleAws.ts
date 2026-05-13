import AWS from 'aws-sdk';

export interface AwsConfig {
  folder: string;
  bucket: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

interface UploadParams {
  ACL: string;
  Body: File;
  Bucket: string;
  Key: string;
  ContentType: string;
}

interface ProgressEvent {
  loaded: number;
  total: number;
}

export class SimpleAws {
  private keyPrefix: string;
  private bucket: string;
  private region: string;

  constructor(config: AwsConfig) {
    this.keyPrefix = config.folder;
    this.bucket = config.bucket;
    this.region = config.region;

    AWS.config.update({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    });
  }

  getBucket(): AWS.S3 {
    return new AWS.S3({
      params: { Bucket: this.bucket },
      region: this.region,
    });
  }

  getUrl(filename: string): string {
    return `https://${this.bucket}.s3-${this.region}.amazonaws.com/${this.keyPrefix}/${filename}`;
  }

  uploadJpg({
    file,
    onProgress,
    filename = null,
  }: {
    file: File;
    onProgress?: (progress: number, filename: string) => void;
    filename?: string | null;
  }): AWS.Request<AWS.S3.PutObjectOutput, AWS.AWSError> {
    const _filename = filename || Date.now().toString(36) + '.jpg';
    const params: UploadParams = {
      ACL: 'public-read',
      Body: file,
      Bucket: this.bucket,
      Key: `${this.keyPrefix}/${_filename}`,
      ContentType: 'image/jpg',
    };

    const request = new AWS.S3({
      params: { Bucket: this.bucket },
      region: this.region,
    })
      .putObject(params)
      .on('httpUploadProgress', (evt: ProgressEvent) => {
        const progress = Math.round((evt.loaded / evt.total) * 100);
        onProgress && onProgress(progress, _filename);
      });

    request.send((err: AWS.AWSError) => {
      if (err) console.log(err);
    });
    return request;
  }
}
