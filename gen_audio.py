"""生成高考加油游戏音频文件"""
import asyncio, os, sys

# === 音频配置 ===
VOICE = "zh-CN-YunyangNeural"  # 男声, 新闻播报风格, 最慷慨激昂
RATE = "+20%"   # 加速20%, 更有激情
PITCH = "+15Hz" # 音调稍高, 更兴奋

AUDIO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "audio")
os.makedirs(AUDIO_DIR, exist_ok=True)

TEXTS = {
    # 开场
    "backstory": "江冠铖看起来好紧张！快点击加油按钮，帮他打气！注意，按钮会到处跑哦！",

    # 里程碑 (慷慨激昂!)
    "milestone5":  "5次了！！太棒了！！江冠铖成绩开始飙升！！语文数学及格了！！继续冲啊！！",
    "milestone10": "10次了！！成绩越来越好！！江冠铖眼睛亮了！！稳住继续冲！！",
    "milestone15": "15次！！突飞猛进！！江冠铖信心大增！！理综马上就要出分了！！",
    "milestone20": "20次了！！就差一步！！江冠铖就要金榜题名了！！再加把劲！！冲啊！！",

    # 胜利 (超激昂!)
    "victory": "江冠铖！！高考必胜！！金榜题名！！清华北大！！冲啊！！前程似锦！！",
}

async def gen_one(name, text):
    out = os.path.join(AUDIO_DIR, f"{name}.mp3")
    if os.path.exists(out):
        print(f"  [skip] {name}.mp3 (exists)")
        return
    import edge_tts
    tts = edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH)
    await tts.save(out)
    size = os.path.getsize(out)
    print(f"  [OK] {name}.mp3 ({size} bytes)")

async def main():
    print(f"Generating {len(TEXTS)} audio files...")
    print(f"Voice: {VOICE}, Rate: {RATE}, Pitch: {PITCH}")
    print(f"Output: {AUDIO_DIR}\n")
    for name, text in TEXTS.items():
        print(f"  {name}: {text[:40]}...")
        await gen_one(name, text)
    print("\nDone! All audio files generated.")

asyncio.run(main())
