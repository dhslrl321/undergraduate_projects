#define _CRT_SECURE_NO_WARNINGS
#include "Plate.h"

//일반 char형을 wide char형으로 만들어줌
wchar_t plate[10][10];
void FirstPlateMakingProcess(void) {//최초 지뢰 판 생성 프로세스
	//const char *plate[10][10]; 

	setlocale(LC_ALL, "");//로케일을 
	for (int i = 0; i < 10; i++) {
		for (int j = 0; j < 10; j++) {
			plate[i][j] = L'○';//
		}
	}
	printf(" 0 1 2 3 4 5 6 7 8 9 \n");//출력을 해줌
	for (int i = 0; i < 10; i++) {
		printf("%d", i);
		for (int j = 0; j < 10; j++) {
			printf("%lc", plate[i][j]);//locale char형 출력
		}printf("\n");
	}
}

void UpdatedPlate(void) {
	printf(" 0 1 2 3 4 5 6 7 8 9 \n");//출력을 해줌
	for (int i = 0; i < 10; i++) {
		printf("%d", i);
		for (int j = 0; j < 10; j++) {
			printf("%lc", plate[i][j]);//locale char형 출력
		}printf("\n");
	}
}

void ReplacingNear(int a, int b) {
	plate[a][b] = L'◎';
}

void ReplacingHit(int a, int b) {
	plate[a - 100][b - 100] = L'●';
} //정답을 맞췄을 때

void MineMakingProcess(int *arr) {//지뢰 생성 프로세스
	srand(time(NULL));
	for (int i = 0; i < 8; i++) {
		*arr++ = rand() % 10;
	}
}
